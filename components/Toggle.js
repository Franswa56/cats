import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, Animated, LayoutAnimation, UIManager, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../utils/style';

// Activer LayoutAnimation sur Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToggleText = ({ title, text }) => {
  const [showText, setShowText] = useState(false); // Gérer l'affichage du texte
  const [textHeight, setTextHeight] = useState(0); // Hauteur du texte calculée
  const [isTextMeasured, setIsTextMeasured] = useState(false); // Savoir si la hauteur a été mesurée
  const animation = useRef(new Animated.Value(0)).current; // Valeur animée de la hauteur

  const toggleText = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animation fluide native
    setShowText(!showText); // Inverser l'état pour afficher ou cacher le texte
    Animated.timing(animation, {
      toValue: showText ? 0 : 1, // Inverser l'animation
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Interpolation pour la hauteur animée et l'opacité, en fonction de la hauteur réelle du texte
  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, textHeight+10  ], // Ajusté selon la hauteur réelle du texte
  });

  const animatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.toggleText}>
      {/* Toujours afficher le titre */}
      <TouchableOpacity onPress={toggleText} style={styles.toggle} activeOpacity={1}>
        <Text style={styles.textTitle}>{title}</Text>
        <Ionicons name={showText ? 'caret-up' : 'caret-down'} size={30} color="black" />
      </TouchableOpacity>

      {/* Ne pas afficher l'Animated.View avant que la hauteur du texte ne soit mesurée */}
      {isTextMeasured && (
        <Animated.View style={[styles.textContainer, { height: animatedHeight, opacity: animatedOpacity, overflow: 'hidden' }]}>
          <Text style={styles.text}>{text}</Text>
        </Animated.View>
      )}

      {/* Mesurer la hauteur du texte mais ne pas l'afficher directement */}
      <View style={{ position: 'absolute', opacity: 0, zIndex: -1 }}>
        <Text
          style={styles.text}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setTextHeight(height); // Stocker la hauteur du texte
            setIsTextMeasured(true); // Indiquer que le texte a été mesuré
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default ToggleText;
