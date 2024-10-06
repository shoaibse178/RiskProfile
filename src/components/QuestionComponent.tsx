import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Option, Question } from '../constants/Data';
import AnswerOption from './AnswerOption';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../redux/reducers/AnswersReducer';
import colors from '../assets/colors/Colors';

interface QuestionProps {
    question: Question;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question }) => {
    const dispatch = useDispatch();
    const answers = useSelector((state: any) => state?.answers?.answers);

    const handleSelect = (option: Option) => {
        dispatch(setAnswer({ questionId: question.id, option }));
    };

    return (
        <View style={styles.questionContainer} key={question.label}>
            <Text style={styles.questionLabel}>{question.label}</Text>
            {question.options.map((option) => (
                <AnswerOption
                    key={option.key}
                    option={option}
                    onSelect={() => handleSelect(option)}
                    isSelected={answers?.[question.id]?.key === option.key}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    questionContainer: {
        marginHorizontal: 15,
        marginTop: 35,
    },
    questionLabel: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
        color:colors.black,
    },
});

export default QuestionComponent;
