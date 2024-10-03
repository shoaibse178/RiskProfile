import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StatusBar,
    useWindowDimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { QUESTIONS } from '../../../core/helpers/Contants';
import { navigate } from '../../../core/navigation/NavigationServices';
import Strings from '../../../res/strings/Strings';
import colors from '../../../res/themes/Colors';
import styles from './Styles';
import Question from '../../components/Question';
import { setSelectedAnswers } from '../../redux/reducers/QuestionnaireReducer';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';

const QuestionnaireScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedAnswers } = useSelector((state: any) => state?.QuestionnaireReducer);

    const [index, setIndex] = useState<number>(0);
    const { width } = useWindowDimensions();
    const carouselReference = useRef<any>(null);

    const renderData = ({ item }: any) => (
        <Question
            key={item?.name}
            options={item?.options}
            question={item?.label}
            onChange={(value: any) => handleValues(value)}
            selectedValues={selectedAnswers[index] ? [selectedAnswers[index]] : []} // Show selected answer for current question
        />
    );

    const handleValues = (value: string[]) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[index] = value[0]; // Save answer for current question
        dispatch(setSelectedAnswers(newSelectedAnswers));
    };

    const createResult = () => {
        let totalScore = 0;

        selectedAnswers.forEach((choice: string, idx: number) => {
            const question = QUESTIONS[idx];
            if (!question) return;

            const choiceIndex = question.options.indexOf(choice);
            if (choiceIndex !== -1) {
                totalScore += question.scores[choiceIndex];
            }
        });

        navigate('ResultScreen', totalScore);
    };

    const onPressNext = () => {
        if (!selectedAnswers[index]) {
            Toast.show({
                type: 'error',
                text1: 'Selection Required',
                text2: 'Please select an option before proceeding',
                position: 'top',
                visibilityTime: 2500,
                autoHide: true,
                topOffset: 70,
            });
            return;
        }
        carouselReference.current?.snapToNext();
    };

    const onPressBack = () => {
        carouselReference.current?.snapToPrev();
    };

    const onPressShowResults = () => {
        if (index === QUESTIONS.length - 1) {
            if (!selectedAnswers[index]) {
                Toast.show({
                    type: 'error',
                    text1: 'Selection Required',
                    text2: 'Please select an option before proceeding',
                    position: 'top',
                    visibilityTime: 2500,
                    autoHide: true,
                    topOffset: 70,
                });
                return;
            }
            createResult();
        }
    };

    return (
        <View style={styles.container} testID="questionnaire-screen">
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
            <View style={styles.header}>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: colors.white }}>Questions</Text>
            </View>
            <View style={styles.progress} testID="progress-bar">
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.white }}>
                    {index + 1}/{QUESTIONS.length}
                </Text>
            </View>
            <Carousel
                ref={carouselReference}
                layout={'default'}
                data={QUESTIONS}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderData}
                lockScrollWhileSnapping={true}
                scrollEnabled={false}
                useScrollView={true}
                onSnapToItem={setIndex}
            />
            <View style={styles.buttonContainer}>
                {index === QUESTIONS.length - 1 ? (
                    <CustomButton title={Strings.SHOW_RESULTS} onPress={onPressShowResults} />
                ) : (
                    <>
                        <CustomButton title={Strings.BACK} onPress={onPressBack} disabled={index === 0} backgroundColor={index === 0 ? colors.disabledColor : colors.primaryColor} />
                        <CustomButton title={Strings.NEXT} onPress={onPressNext} />
                    </>
                )}
            </View>
            {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </View>
    );
};

export default QuestionnaireScreen;
