import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Button = ({onPress, iconName, style, size}) => (
    <TouchableOpacity onPress={onPress} style={style}>
    <LinearGradient
      colors={['#bfd255', '#8eb92a', '#72aa00', '#9ecb2d']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={style}>
      <Ionicons name={iconName} size={size} color="white" />
    </LinearGradient>
  </TouchableOpacity>
);

export default Button;
