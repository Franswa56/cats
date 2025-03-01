import React, {useState, useEffect} from 'react';
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
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Importer LinearGradient
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';
import logo from './android/app/src/main/assets/logo.png';
import Button from './components/button';
import {convertToBase64, identifyInsect} from './utils/imageUtils';
import styles from './utils/style';
import ToggleText from './components/Toggle';
import {saveInsectData, loadIdentifiedInsects} from './utils/saveInsect';
import Zoo from './components/Zoo';
import Insect from './components/Insect';

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [insectInfo, setInsectInfo] = useState(null);
  const [isZooOpen, setIsZooOpen] = useState(false);

  //ouverture ou non des données :
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription); // Inverser l'état
  };

  const backHome = () => {
    setPhoto(null);
    setIsZooOpen(false);
    setInsectInfo(null);
  };

  const API_KEY = 'wPZ60wFLnpG77jPgDjN6jEh7BOuEYYTxAuuJ9qPhBGznlr5g2q';

  const handlePhotoResponse = async response => {
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

      try {
        const base64Image = await convertToBase64(photoUri); // Utilisation de la fonction externalisée
        const insectData = await identifyInsect(base64Image, API_KEY); // Utilisation de la fonction externalisée

        if (
          insectData &&
          insectData.details &&
          insectData.details.common_names
        ) {
          setInsectInfo(insectData); // Enregistre les informations sur l'insecte
          await saveInsectData(photoUri, insectData);
        } else {
          Alert.alert(
            'Données incomplètes',
            "Les informations sur l'insecte sont incomplètes ou invalides.",
          );
        }
      } catch (error) {
        Alert.alert('Erreur', error.message);
      }
    } else {
      Alert.alert('Erreur', 'Impossible de récupérer la photo.');
    }
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo', cameraType: 'back'}, handlePhotoResponse);
  };

  const choosePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      handlePhotoResponse,
    );
  };

  const toggleZoo = () => {
    setIsZooOpen(!isZooOpen);
  };

  ///// permissions ////


  // Stockage //
  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Accès au stockage',
          message:
            "L'application a besoin d'accéder à votre stockage pour afficher les images.",
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
  }

  // photo // 

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Accès à la caméra',
          message:
            "L'application a besoin d'accéder à votre caméra pour prendre des photos.",
          buttonNeutral: 'Demander plus tard',
          buttonNegative: 'Annuler',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission de la caméra accordée');
      } else {
        console.log('Permission de la caméra refusée');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  

  // Appelle cette fonction pour demander les permissions
  useEffect(() => {
    requestStoragePermission();
    requestCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#A8E063', '#56AB2F']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}>
        <ScrollView contentContainerStyle={styles.page}>
          {!photo && (
            <Text style={styles.homeTitle}>Identify any insect !</Text>
          )}
          {!photo && <Image source={logo} style={styles.logo} />}
          {!photo && (
            <View style={styles.buttonContainer}>
              <Button
                onPress={toggleZoo}
                iconName="bug"
                style={styles.button}
                size={30}
              />
              <Button
                onPress={takePhoto}
                iconName="camera"
                style={styles.photoButton}
                size={60}
              />
              <Button
                onPress={choosePhoto}
                iconName="folder"
                style={styles.button}
                size={30}
              />
            </View>
          )}
          {photo && (
            <ScrollView style={styles.result}>
              {insectInfo ? (
                <Insect photo={photo} insectInfo={insectInfo} />
              ) : (
                <View style={styles.loaderContainer}>
                  <Text style={styles.loaderText}>Analyzing...</Text>
                  <ActivityIndicator size={70} color="#56AB2F" />
                </View>
              )}
            </ScrollView>
          )}
          <Button
            onPress={backHome}
            iconName="arrow-undo"
            style={styles.backButton}
            size={30}
          />
        </ScrollView>
      </LinearGradient>
      {isZooOpen && (
        <View style={styles.zooOverlay}>
          <LinearGradient
            colors={['#A8E063', '#56AB2F']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.background}>
            <Button
              onPress={backHome}
              iconName="arrow-undo"
              style={styles.backButton}
              size={30}
            />
            <Zoo />
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

export default App;
