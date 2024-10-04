import React, { useRef, useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { QUESTIONS } from '../../core/helpers/Data';
import { useDispatch } from 'react-redux';
import { submitAnswers } from '../../redux/reducers/QuestionsReducer';
import colors from '../../res/themes/Colors';
import Strings from '../../res/strings/Strings';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import styles from './Styles';
import { resetActions } from '../../core/navigation/NavigationServices';
import QuestionItem from '../../components/QuestionItem';
import { SafeAreaView } from 'react-native-safe-area-context';


const Questions: React.FC = () => {
    const carouselReference = useRef<any>(null);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const [responses, setResponses] = useState<{ [key: number]: string }>({});
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const handleOptionChange = (questionId: number, optionKey: string) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: optionKey,
        }));
    };

    const renderItem = ({ item }: { item: typeof QUESTIONS[number] }) => (
        <QuestionItem 
            question={item} 
            selectedOption={responses[item.id]} 
            onOptionChange={(optionKey) => handleOptionChange(item.id, optionKey)} 
        />
    );

    const onPressNext = () => {
        if (!responses[activeSlide + 1]) {
            showErrorToast();
            return;
        }
        carouselReference.current?.snapToNext();
    };

    const onPressBack = () => {
        carouselReference.current?.snapToPrev();
    };

    const onPressShowResults = () => {
        if (activeSlide === QUESTIONS.length - 1) {
            if (!responses[activeSlide + 1]) {
                showErrorToast();
                return;
            }
            const results = QUESTIONS.map((q) => ({
                id: q.id,
                score: q.options.find((opt) => opt.key === responses[q.id])?.score || 0,
            }));
            dispatch(submitAnswers(results));
            resetActions('Result')
        }
    };

    const showErrorToast = () => {
        return (
            Toast.show({
            type: 'error',
            text1: 'Selection Required',
            text2: 'Please select an option before proceeding',
            position: 'top',
            visibilityTime: 2500,
            autoHide: true,
            topOffset: 70,
        }));
    }

    return (
            <View style={styles.container}> 
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Questions</Text>
            </View>

            <View style={styles.questionProgressView}>
                <View style={styles.questionProgressCircle}>
                <Text style={styles.numberText}>
                    {activeSlide + 1}/{QUESTIONS.length}
                </Text>
                </View>
            </View>

            <View style={styles.carouselView}>
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
                onSnapToItem={(index:number) => setActiveSlide(index)}
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


export default Questions;