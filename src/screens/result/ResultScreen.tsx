import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { resetActions } from '../../../core/navigation/NavigationServices';
import {useDispatch} from 'react-redux';
import Strings from '../../../res/strings/Strings';
import { QUESTIONS } from '../../../core/helpers/Contants';
import styles from './Styles';
import { resetSelectedAnswers } from '../../redux/reducers/QuestionnaireReducer';

interface ResultScreenProps {
  route: {
    params: number;
  };
}

const ResultScreen: React.FC<ResultScreenProps> = ({route}) => {
  const dispatch = useDispatch();
  const totalScore = route?.params;

  const determineRiskProfile = (score: number): string => {
    
    // Calculate the minimum and maximum possible scores
    const minScore = QUESTIONS.reduce(
      (sum, question) => sum + Math.min(...question.scores),
      0,
    );
    const maxScore = QUESTIONS.reduce(
      (sum, question) => sum + Math.max(...question.scores),
      0,
    );

    // Define the ranges dynamically
    const rangeStep = (maxScore - minScore) / 3;
    const ranges = [
      {upperLimit: minScore + rangeStep, riskProfile: 'Conservative'},
      {upperLimit: minScore + 2 * rangeStep, riskProfile: 'Balanced'},
      {upperLimit: maxScore, riskProfile: 'Aggressive'},
    ];

    // Find the appropriate risk profile based on the score
    for (let i = 0; i < ranges.length; i++) {
      if (score <= ranges[i].upperLimit) {
        return ranges[i].riskProfile;
      }
    }
    // Default return 
    return 'Unknown';
  };

  return (
     <ImageBackground
       source={require('../../../res/images/background.jpg')}
      style={styles.backgroundImage}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <View style={styles.spacing}>
        <Text style={styles.yourScore}>{totalScore}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.feedbackTitle}>
            {determineRiskProfile(totalScore)}
          </Text>
          <Text style={{}}>{Strings.RISK_DESCRIPTION}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              resetActions('QuestionnaireScreen');
              dispatch(resetSelectedAnswers());
            }}>
            <Text style={styles.nextButtonText}>{Strings.START_AGAIN}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ResultScreen;
