import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import colors from '../../res/themes/Colors';
import CheckBox from 'react-native-check-box';

export type selectedOptionType = {
  [index: string]: boolean;
}

export type QuestionProps = {
  question?: string;
  options: string[];
  selectedValues: string[];
  onChange: (value: null | string[]) => void;
}

const Question = ({ question, options, selectedValues, onChange }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<selectedOptionType>({});

  useEffect(() => {
    // Initialize temporary object to hold selection state
    let valueSelectorTmp: selectedOptionType = {};

    // Initialize all options to false initially
    options?.forEach((choice: string) => {
      valueSelectorTmp[choice] = false;
    });

    // Mark selected values as true
    selectedValues?.forEach((choice: string) => {
      valueSelectorTmp[choice] = true;
    });

    // Update state with the temporary object
    setSelectedOption(valueSelectorTmp);
  }, []);

  const onOptionPress = (option: string) => {
    // Initialize temporary object to hold selection state
    let valueSelectorTmp: selectedOptionType = {};

    // Initialize all options to false initially
    options?.forEach((choice: string) => {
      valueSelectorTmp[choice] = false;
    });

    // If the current option is already selected
    if (selectedOption[option]) {
      // Clear selection
      onChange([]);
      setSelectedOption(valueSelectorTmp); // Reset all options to false
    } else {
      // Select the current option
      onChange([option]);
      setSelectedOption({
        ...valueSelectorTmp,
        [option]: true, // Set only the current option to true
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={{paddingVertical:80,borderWidth:1,borderColor:colors.primaryColor,borderRadius:20,alignItems:'center',justifyContent:'center'}}> */}
      {question && <Text style={styles.question}>{question}</Text>}
      {/* </View> */}
      {options?.map((option: string) => {
        return (
          <Pressable  onPress={() => onOptionPress(option)}>
            <View style={[styles.chip,{backgroundColor:selectedOption[option] ? colors.primaryColor : colors.white}]}>
              {/* <CheckBox
                style={styles.checkbox}
                onClick={() => onOptionPress(option)}
                isChecked={selectedOption[option]}
                checkBoxColor={
                  selectedOption[option] ? colors.primaryColor : colors.grayColor
                }
                testID="checkbox"
              /> */}
              <View style={styles.questionContainer}>
                <Text
                  style={[
                    styles.questionText,
                    {
                      color: selectedOption[option]
                        ? colors.white
                        : colors.black,
                    },
                  ]}>
                  {option}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height:350,
    justifyContent: 'center',
    paddingHorizontal:5,
    marginHorizontal: 15,
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 25,
    // marginTop: 25,
    // marginHorizontal: 20,
    fontSize: 17,
    // paddingVertical:20,
    // paddingHorizontal:10,
  },
  chip: {
    alignItems: 'center',
    justifyContent:'center',
    // marginHorizontal: 15,
    marginVertical: 7,
    paddingVertical: 15,
    // minHeight: 50,
    borderRadius: 20,
    // flexDirection: 'row',
    backgroundColor:'red',
    borderWidth:1,
    borderColor:colors.primaryColor
  },
  questionContainer: {
    flexShrink: 1,
    marginHorizontal: 5,
  },
  questionText: {
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    fontSize: 15,
  },
  checkbox: {
    marginRight: 20,
  },
});

export default Question;
