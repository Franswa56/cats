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

const Zoo = ({toggleZoo}) => {
  const [insects, setInsects] = useState([]);

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.zooTitle}>My bug collection</Text>
      <View style={styles.insectContainer}>
      {insects.length > 0 ? (
        insects.map((insect, index) => (
          <View key={index} style={styles.insectCard}>
              <Text style={styles.insectName}>
                {insect.insect.details.common_names[0] || 'Nom inconnu'}
              </Text>
              {insect.photoExists ? (
                <Image
                  source={{uri: `file://${insect.photo}`}} // Assure-toi que 'file://' est bien ajouté
                  style={styles.insectImage}
                  resizeMode="cover"
                  onError={e => {
                    console.log(
                      "Erreur de chargement de l'image:",
                      e.nativeEvent.error,
                    ); // Vérifie s'il y a des erreurs
                  }}
                />
              ) : (
                <Text>Image non trouvée: {insect.photo}</Text>
              )}

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteInsect(index)}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
              </TouchableOpacity>
          </View>
          
        ))
        
      ) : (
        <Text>Aucun insecte sauvegardé.</Text>
      )}
      </View>
    </ScrollView>
  );
};

export default Zoo;
