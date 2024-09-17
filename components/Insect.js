import React, {useState, useEffect, useRef} from 'react';
import {Text, View, ScrollView, Image, Animated, Linking} from 'react-native';
import ToggleText from './Toggle';
import styles from '../utils/style';

const Insect = ({photo, insectInfo}) => {
  const [animatedPercentage] = useState(new Animated.Value(0)); // Initialisation à 0
  const [displayPercentage, setDisplayPercentage] = useState(0); // État pour stocker le pourcentage à afficher

  useEffect(() => {
    // Animation pour faire augmenter le pourcentage
    Animated.timing(animatedPercentage, {
      toValue: insectInfo.probability * 100, // Aller à la probabilité réelle
      duration: 2000, // Durée de l'animation (1 seconde)
      useNativeDriver: false, // Ne pas utiliser le driver natif car nous animons une valeur qui affecte le texte
    }).start();

    // Écoute les changements de valeur de l'animation
    animatedPercentage.addListener(({value}) => {
      setDisplayPercentage(value.toFixed(2)); // Met à jour la valeur arrondie à 2 décimales
    });

    // Nettoyage lors du démontage du composant
    return () => {
      animatedPercentage.removeAllListeners();
    };
  }, [insectInfo.probability]);

  // Définir la couleur du texte en fonction de la probabilité
  const getPercentageColor = () => {
    if (insectInfo.probability < 0.3) {
      return {color: 'red'};
    } else if (
      insectInfo.probability >= 0.3 &&
      insectInfo.probability <= 0.55
    ) {
      return {color: 'orange'};
    } else {
      return {color: 'green'};
    }
  };

  // Animation d'arrivée par le bas
  const translateY = useRef(new Animated.Value(1000)).current; // Initialiser à une position en dehors de l'écran

  useEffect(() => {
    // Lancer l'animation de translation de bas en haut
    Animated.timing(translateY, {
      toValue: 0, // Aller à la position finale
      duration: 700, // Durée de l'animation (500 ms)
      useNativeDriver: true, // Utiliser le driver natif pour améliorer les performances
    }).start();

    // Fonction de nettoyage qui sera exécutée lorsque le composant est quitté
    return () => {
      console.log('Composant Insect quitté, nettoyage des données...');
    };
  }, []);

  return (
    <ScrollView style={styles.insectFiche}>
      {/* Utilisation de Animated.View pour appliquer la translation */}
      <Animated.View style={{transform: [{translateY}]}}>
        <Image source={{uri: photo}} style={styles.imageTaken} />
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

            {/* Affichage du pourcentage avec couleur conditionnelle */}
            <Animated.Text style={[styles.textTitle, getPercentageColor()]}>
              {displayPercentage}%
            </Animated.Text>
          </View>
          <ToggleText
            title="common names"
            text={insectInfo.details.common_names.join(',    ')}
          />
          <ToggleText
            title="Description"
            text={insectInfo.details.description.value}
          />
          <View style={styles.credits}>
            <Text>
              More infos :{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(insectInfo.details.url)}>
                Wikipedia
              </Text>
            </Text>
            {insectInfo.similar_images.map((img, index) => (
              <View key={index}>
                <Text style={styles.textSmall}>Crédit : {img.citation}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default Insect;
