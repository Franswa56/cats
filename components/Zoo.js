import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';
import {loadIdentifiedInsects, deleteInsect} from '../utils/saveInsect';
import styles from '../utils/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Insect from './Insect';

const Zoo = ({toggleZoo}) => {
  const [insects, setInsects] = useState([]);
  const [selectedInsect, setSelectedInsect] = useState(null);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission de lecture du stockage',
          message:
            "L'application a besoin d'accéder à vos fichiers pour afficher les images des insectes.",
          buttonNeutral: 'Demander plus tard',
          buttonNegative: 'Annuler',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission de stockage accordée');
      } else {
        console.log('Permission de stockage refusée');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchInsects = async () => {
    await requestStoragePermission();
    const savedInsects = await loadIdentifiedInsects();

    const insectsWithFileCheck = await Promise.all(
      savedInsects.map(async insect => {
        const exists = await RNFS.exists(insect.photo);
        console.log(
          `Vérification de l'image : ${insect.photo}, Existe : ${exists}`,
        );
        return {...insect, photoExists: exists};
      }),
    );

    console.log(
      'Insectes avec vérification des fichiers:',
      insectsWithFileCheck,
    );
    setInsects(insectsWithFileCheck);
  };

  useEffect(() => {
    fetchInsects();
  }, []);

  const handleDeleteInsect = index => {
    Alert.alert(
      "Supprimer l'insecte",
      'Êtes-vous sûr de vouloir supprimer cet insecte ?',
      [
        {text: 'Annuler', style: 'cancel'},
        {
          text: 'Supprimer',
          onPress: async () => {
            await deleteInsect(index);
            fetchInsects();
          },
        },
      ],
    );
  };
  const handleSelectInsect = insect => {
    setSelectedInsect(insect); // Définir l'insecte sélectionné
    console.log(selectedInsect);
  };

  return (
    <ScrollView style={styles.container}>
      {!selectedInsect && (
        <Text style={styles.zooTitle}>My bug collection</Text>
      )}
      {selectedInsect ? (
        <Insect
          photo={`file://${selectedInsect.photo}`}
          insectInfo={selectedInsect.insect}
        /> // Affichage du composant Insect
      ) : (
        <View style={styles.insectContainer}>
          {insects.length > 0 ? (
            insects.map((insect, index) => (
              <TouchableOpacity
                key={index}
                style={styles.insectCard}
                onPress={() => handleSelectInsect(insect)} // Sélectionner l'insecte lors du clic
              >
                <Text style={styles.insectName}>
                  {insect.insect.details.common_names[0] || 'Nom inconnu'}
                </Text>
                {insect.photoExists ? (
                  <Image
                    source={{uri: `file://${insect.photo}`}}
                    style={styles.insectImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text>Image non trouvée: {insect.photo}</Text>
                )}

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteInsect(index)}>
                  <Ionicons name="trash" size={25} color="red" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Aucun insecte sauvegardé.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default Zoo;
