import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { loadIdentifiedInsects } from '../utils/saveInsect'; // Remplace par le bon chemin
import styles from '../utils/style';

const Zoo = ({ toggleZoo }) => {
  const [insects, setInsects] = useState([]);

  // Charger les insectes sauvegardés quand le composant est monté
  useEffect(() => {
    const fetchInsects = async () => {
      const savedInsects = await loadIdentifiedInsects();
      setInsects(savedInsects);
    };

    fetchInsects();
  }, []);

  return (
    <View style={styles.zooContainer}>
      <Text style={styles.zooText}>La bibliothèque est ouverte !</Text>
      
      <ScrollView contentContainerStyle={styles.insectList}>
        {insects.length > 0 ? (
          insects.map((insect, index) => (
            <View key={index} style={styles.insectItem}>
              <Image source={{ uri: insect.photo }} style={styles.insectImage} />
              <Text style={styles.insectName}>
                {insect.insect.details.common_names[0] || 'Nom inconnu'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noInsectsText}>Aucun insecte sauvegardé.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Zoo;