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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient'; // Importer LinearGradient
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../android/app/src/main/assets/logo.png';
import Button from '../components/button';
import {convertToBase64, identifyInsect} from './utils/imageUtils';
import styles from '../utils/style';
import ToggleText from '../components/Toggle';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [insectInfo, setInsectInfo] = useState(null);

  //ouverture ou non des données :
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription); // Inverser l'état
  };

  const API_KEY = 'eSnPnTIyxHKWQIpvYWAco13Y9a91N37rAKMyXX54BvVbVgSOJf';

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
          {!photo && (
            <Text style={styles.homeTitle}>Identify any insect !</Text>
          )}
          {!photo && <Image source={logo} style={styles.logo} />}
          {!photo && (
            <View style={styles.buttonContainer}>
              <Button
                onPress={takePhoto}
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
            <View style={styles.result}>
              <Image source={{uri: photo}} style={styles.imageTaken} />
              {insectInfo ? (
                <>
                  <Image
                    source={{uri: insectInfo.details.image.value}}
                    style={styles.image}
                  />
                  <View style={styles.infoContainer}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.name}>
                        {insectInfo.details.common_names[0]}
                      </Text>
                      <Text style={styles.textTitle}>({insectInfo.name})</Text>
                    </View>
                    <ToggleText
                      title="common names"
                      text={insectInfo.details.common_names.join(',    ')}
                    />
                    <ToggleText
                      title="Description"
                      text={insectInfo.details.description.value}
                    />
                    <Text>
                      Plus d'infos :{' '}
                      <Text
                        style={styles.link}
                        onPress={() => Linking.openURL(insectInfo.details.url)}>
                        Wiki
                      </Text>
                    </Text>
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
                  </View>
                </>
              ) : (
                <Text style={styles.textLoader}>Analyse en cours...</Text>
              )}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;
