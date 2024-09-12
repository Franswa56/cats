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
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Importer LinearGradient
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from './android/app/src/main/assets/logo.png';
import Button from './components/button';
import {convertToBase64, identifyInsect} from './utils/imageUtils';
import styles from './utils/style';


const App = () => {
  const [photo, setPhoto] = useState(null);
  const [insectInfo, setInsectInfo] = useState(null);

  //ouverture ou non des données :
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription); // Inverser l'état
  };

  const API_KEY = 'eSnPnTIyxHKWQIpvYWAco13Y9a91N37rAKMyXX54BvVbVgSOJf';

  const handlePhotoResponse = async (response) => {
    if (response.didCancel) {
      Alert.alert('Action annulée', 'Vous avez annulé la prise de photo.');
    } else if (response.errorCode) {
      Alert.alert('Erreur', `Erreur lors de la prise de photo : ${response.errorMessage}`);
    } else if (response.assets && response.assets[0].uri) {
      const photoUri = response.assets[0].uri;
      setPhoto(photoUri);

      try {
        const base64Image = await convertToBase64(photoUri); // Utilisation de la fonction externalisée
        const insectData = await identifyInsect(base64Image, API_KEY); // Utilisation de la fonction externalisée
        setInsectInfo(insectData); // Enregistre les informations sur l'insecte
      } catch (error) {
        Alert.alert('Erreur', error.message);
      }
    } else {
      Alert.alert('Erreur', 'Impossible de récupérer la photo.');
    }
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo'}, handlePhotoResponse);
  };

  const choosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, handlePhotoResponse);
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
            <Button onPress={takePhoto} iconName="camera" />
            <Button onPress={takePhoto} iconName="bug" />
            <Button onPress={choosePhoto} iconName="folder" />
          </View>
          {!photo && (<Image source={logo} style={styles.logo} />)}
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
                  <TouchableOpacity
                    onPress={toggleDescription}
                    style={styles.toggle}>
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

export default App;
