import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../assets/colors/Colors';

export type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  marginTop?: number;
}

const CustomButton = ({ title, onPress, disabled, backgroundColor, marginTop }: ButtonProps) => {

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: backgroundColor ? backgroundColor : colors.primaryColor, marginTop: marginTop ? marginTop : 0 }]} onPress={onPress} disabled={disabled}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '45%',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
  }
});

export default CustomButton;
