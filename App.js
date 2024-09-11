import React, {useState} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Importer LinearGradient
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [insectInfo, setInsectInfo] = useState(null);

  //ouverture ou non des données :
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription); // Inverser l'état
  };

  const API_KEY = 'eSnPnTIyxHKWQIpvYWAco13Y9a91N37rAKMyXX54BvVbVgSOJf';

  const takePhoto = () => {
    launchCamera({mediaType: 'photo'}, response => {
      console.log(response);
      if (response.didCancel) {
        Alert.alert('Action annulée', 'Vous avez annulé la prise de photo.');
      } else if (response.errorCode) {
        Alert.alert(
          'Erreur',
          `Erreur lors de la prise de photo : ${response.errorMessage}`,
        );
      } else if (response.assets && response.assets[0].uri) {
        const photoUri = response.assets[0].uri;
        setPhoto(photoUri);
        convertToBase64(photoUri);
      } else {
        Alert.alert('Erreur', 'Impossible de récupérer la photo.');
      }
    });
  };

  const choosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets[0].uri) {
        const photoUri = response.assets[0].uri; // Définir photoUri ici
        setPhoto(photoUri);
        convertToBase64(photoUri); // Utiliser photoUri ici
      } else {
        Alert.alert('Erreur', 'Impossible de récupérer la photo.');
      }
    });
  };

  // Fonction pour convertir l'image en base64
  const convertToBase64 = async photoUri => {
    try {
      const base64Image = await RNFS.readFile(photoUri, 'base64');
      identifyInsect(base64Image);
    } catch (error) {
      Alert.alert('Erreur', "Échec de la conversion de l'image.");
      console.log(error);
    }
  };

  // Fonction pour faire la requête à Insect.ID
  const identifyInsect = async base64Image => {
    try {
      const response = await axios.post(
        'https://insect.kindwise.com/api/v1/identification?details=common_names,url,description,image',
        {
          images: [`data:image/jpeg;base64,${base64Image}`], // L'image en base64
          latitude: 49.207, // Remplace par la latitude actuelle de l'utilisateur si nécessaire
          longitude: 16.608, // Remplace par la longitude actuelle
          similar_images: true,
        },
        {
          headers: {
            'Api-Key': API_KEY,
            'Content-Type': 'application/json',
          },
        },
      );

      // Traite la réponse
      const insectData = response.data.result.classification.suggestions[0]; // Premier résultat suggéré
      setInsectInfo(insectData); // Enregistre les informations sur l'insecte
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      Alert.alert(
        'Erreur',
        `Impossible d'identifier l'insecte : ${errorMessage}`,
      );
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#A8E063', '#56AB2F']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}>
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePhoto} style={styles.button}>
              <LinearGradient
                colors={['#bfd255', '#8eb92a', '#72aa00', '#9ecb2d']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.button}>
                <Ionicons name="camera" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={choosePhoto} style={styles.button}>
              <LinearGradient
                colors={['#bfd255', '#8eb92a', '#72aa00', '#9ecb2d']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.button}>
                <Ionicons name="folder" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {photo && (
            <>
              <Image source={{uri: photo}} style={styles.imageTaken} />
              {insectInfo ? (
                <>
                  <Text style={styles.textTitle}>
                    Nom scientifique :{' '}
                    <Text style={styles.text}>{insectInfo.name}</Text>
                  </Text>
                  <Text style={styles.textTitle}>
                    Noms communs :{' '}
                    <Text style={styles.text}>
                      {insectInfo.details.common_names.join(', ')}
                    </Text>
                  </Text>
                  <TouchableOpacity onPress={toggleDescription} style={styles.toggle}>
                    <Text style={styles.textTitle}>Description :</Text>
                    <Ionicons name="caret-down" size={30} color="black" />
                  </TouchableOpacity>
                  {showDescription && (
                    <Text style={styles.text}>
                      {insectInfo.details.description.value}
                    </Text>
                  )}
                  <Image
                    source={{uri: insectInfo.details.image.value}}
                    style={styles.image}
                  />
                  <Text style={styles.text}>
                    Plus d'infos :{' '}
                    <Text
                      style={styles.link}
                      onPress={() => Linking.openURL(insectInfo.details.url)}>
                      Wiki
                    </Text>
                  </Text>

                  <Text style={styles.textTitle}>Images similaires :</Text>
                  {insectInfo.similar_images.map((img, index) => (
                    <View key={index}>
                      <Image
                        source={{uri: img.url_small}}
                        style={styles.similarImage}
                      />
                      <Text style={styles.textSmall}>
                        Crédit : {img.citation}
                      </Text>
                    </View>
                  ))}
                </>
              ) : (
                <Text style={styles.text}>Analyse en cours...</Text>
              )}
            </>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  page: {
    flexGrow: 1, // Permet au contenu du ScrollView de croître et de pouvoir défiler
    justifyContent: 'flex-start', // Optionnel : pour aligner le contenu en haut
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTaken: {
    with: 100,
    height: 200,
    borderRadius: 45,
    margin: 20,
    objectFit: 'contain',
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
    borderRadius: 25,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    marginHorizontal: 15,
  },
  toggle: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    alignItems: 'center'
  }
});

export default App;
