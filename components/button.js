import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Button = ({onPress, iconName}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <LinearGradient
      colors={['#bfd255', '#8eb92a', '#72aa00', '#9ecb2d']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.button}>
      <Ionicons name={iconName} size={30} color="white" />
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 119,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
