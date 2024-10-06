import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Strings from '../utils/Strings';
import CustomButton from './CustomButton';
import colors from '../assets/colors/Colors';

const { width } = Dimensions.get('window');

interface QuestionCarouselProps {
    QUESTIONS: any[];
    activeSlide: number;
    setActiveSlide: (index: number) => void;
    carouselReference: React.Ref<any>;
    renderItem: ({ item }: { item: any }) => JSX.Element;
    onPressShowResults: () => void;
    onPressBack: () => void;
    onPressNext: () => void;
}

const QuestionCarousel: React.FC<QuestionCarouselProps> = ({
    QUESTIONS,
    activeSlide,
    setActiveSlide,
    carouselReference,
    renderItem,
    onPressShowResults,
    onPressBack,
    onPressNext,
}) => {
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
                        <CustomButton
                            title={Strings.BACK}
                            onPress={onPressBack}
                            disabled={activeSlide === 0}
                            backgroundColor={activeSlide === 0 ? colors.disabledColor : colors.primaryColor}
                        />
                        <CustomButton title={Strings.NEXT} onPress={onPressNext} />
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
      },
      questionProgressView: {
        justifyContent: 'center',
      },
      questionProgressCircle: {
        height: 60,
        width: 60,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        top: 10,
        right: 15,
      },
      numberText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.white
      },
      buttonContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
});

export default QuestionCarousel;
