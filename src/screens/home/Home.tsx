import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Strings from '../../utils/Strings';
import Toast from 'react-native-toast-message';
import styles from './Styles';
import { QUESTIONS } from '../../constants/Data';
import QuestionComponent from '../../components/QuestionComponent';
import { resetActions } from '../../navigation/NavigationServices';
import { RootState } from '../../redux/store';
import QuestionCarousel from '../../components/QuestionCarousel';


const Home: React.FC = () => {
    const carouselReference = useRef<any>(null);
    const { answers } = useSelector((state: RootState) => state.answers);
    const [activeSlide, setActiveSlide] = useState<number>(0);


    const calculateScore = () => {
        let score = 0;

        Object.values(answers).forEach((answer) => {
            if (answer) {
                score += answer.score;
            }
        });

        let riskLevel = '';
        if (score <= 10) riskLevel = Strings.LOW;
        else if (score <= 20) riskLevel = Strings.MEDIUM;
        else riskLevel = Strings.HIGH;
        return { score, riskLevel };
    };

    const onPressShowResults = () => {
        if (activeSlide === QUESTIONS.length - 1) {
            const currentAnswer = answers?.[QUESTIONS[activeSlide].id];
            if (!currentAnswer) {
                showErrorToast();
                return;
            }
            const data = calculateScore();
            resetActions('Result', { userData: data })
        }
    };

    const onPressNext = () => {
        const currentAnswer = answers?.[QUESTIONS[activeSlide].id];
        if (!currentAnswer) {
            showErrorToast();
            return;
        }
        carouselReference.current?.snapToNext();
    };

    const onPressBack = () => {
        if (activeSlide > 0) {
            carouselReference.current?.snapToPrev();
        }
    };

    const showErrorToast = () => {
        return (
            Toast.show({
                type: Strings.ERRROR,
                text1: Strings.SELECTION_REQUIRED,
                text2: Strings.SELECT_OPTION,
                position: 'top',
                visibilityTime: 2500,
                autoHide: true,
                topOffset: 55,
            }));
    }

    const renderItem = ({ item }: { item: any }) => {
        return <QuestionComponent question={item} />;
    };

    return (
        <View style={styles.container}>
        <QuestionCarousel
            QUESTIONS={QUESTIONS}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            carouselReference={carouselReference}
            renderItem={renderItem}
            onPressShowResults={onPressShowResults}
            onPressBack={onPressBack}
            onPressNext={onPressNext}
        />
        </View>
    );
};


export default Home;