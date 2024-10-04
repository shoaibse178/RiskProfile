import React, {useEffect} from 'react';
import {View,Text} from 'react-native';
import Strings from '../../res/strings/Strings';
import { resetActions } from '../../core/navigation/NavigationServices';
import styles from './Styles';

const Splash: React.FC = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      resetActions('Questions');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.RISK_SURVEY}</Text>
    </View>
  );
};

export default Splash;
