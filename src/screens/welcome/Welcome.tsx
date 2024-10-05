import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { setName } from '../../redux/reducers/AnswersReducer';
import { resetActions } from '../../navigation/NavigationServices';
import CustomButton from '../../components/CustomButton';
import Strings from '../../utils/Strings';
import styles from './Styles';

const Welcome: React.FC = () => {
  const [nameInput, setNameInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!nameInput.trim()) {
      setError(true);
    } else {
      setError(false);
      dispatch(setName(nameInput));
      resetActions('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.avoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.viewWelcomeDescription}>
            <View style={styles.welcomeView}>
              <Text style={styles.welcome}>Welcome</Text>
            </View>
            <Text style={styles.description}>
              {Strings.DESCRIPTION}
            </Text>
          </View>
          <View style={styles.viewNameInput}>
            <Text style={styles.name}>{Strings.ENTER_NAME}:</Text>
            <TextInput
              value={nameInput}
              onChangeText={(text: string) => {
                setError(false);
                setNameInput(text);
              }}
              editable={true}
              placeholder={Strings.ENTER_NAME}
              style={styles.input}
              maxLength={20}
            />
            {error && <Text style={styles.error}>{Strings.NAME_REQUIRED}</Text>}
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton title={Strings.START} onPress={handleSubmit} marginTop={50} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Welcome;
