import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../utils/style';

const Loader = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    return () => rotateAnimation.stop(); // Arrêter l'animation lors du démontage
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.loader, { transform: [{ rotate: spin }] }]}>
      <Ionicons name="sync" size={30} color="#000" />
    </Animated.View>
  );
};

export default Loader;