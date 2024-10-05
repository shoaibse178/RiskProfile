import React, { useRef, useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import colors from '../../assets/colors/Colors';
import Strings from '../../utils/Strings';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import styles from './Styles';
import { QUESTIONS } from '../../constants/Data';
import QuestionComponent from '../../components/QuestionComponent';
import { resetActions } from '../../navigation/NavigationServices';
import { RootState } from '../../redux/store';


const Home: React.FC = () => {
    const carouselReference = useRef<any>(null);
    const { answers } = useSelector((state: RootState) => state.answers);
    const { width } = useWindowDimensions();
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
            <View style={styles.questionProgressCircle}>
                <Text style={styles.numberText}>
                    {activeSlide + 1}/{QUESTIONS.length}
                </Text>
            </View>

            <View>
                <Carousel
                    ref={carouselReference}
                    layout={'default'}
                    data={QUESTIONS}
                    sliderWidth={width}
                    itemWidth={width}
                    renderItem={renderItem}
                    lockScrollWhileSnapping={true}
                    scrollEnabled={false}
                    useScrollView={true}
                    onSnapToItem={(index: number) => setActiveSlide(index)}
                />
            </View>

            <View style={styles.buttonContainer}>
                {activeSlide === QUESTIONS.length - 1 ? (
                    <CustomButton title={Strings.SHOW_RESULTS} onPress={onPressShowResults} />
                ) : (
                    <>
                        <CustomButton title={Strings.BACK} onPress={onPressBack} disabled={activeSlide === 0} backgroundColor={activeSlide === 0 ? colors.disabledColor : colors.primaryColor} />
                        <CustomButton title={Strings.NEXT} onPress={onPressNext} />
                    </>
                )}
            </View>
        </View>
    );
};


export default Home;