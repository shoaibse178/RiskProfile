import React, {useEffect} from 'react';
import {View, Image, StyleSheet, StatusBar,Text} from 'react-native';
import colors from '../../../res/themes/Colors';
import Strings from '../../../res/strings/Strings';

const SplashScreen: React.FC = ({navigation}:any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation?.replace('QuestionnaireScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <Image
        source={require('../../../res/images/background.jpg')}
        style={styles.image}
        testID="splash-screen-image"
      />
       <View style={styles.overlay}>
        <Text style={styles.appName}>{Strings.RISK_SURVEY}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
  },
  appName: {
    color: colors.black,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
