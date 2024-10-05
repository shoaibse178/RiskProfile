import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Option } from '../constants/Data';
import colors from '../assets/colors/Colors';

interface AnswerOptionProps {
    option: Option;
    onSelect: () => void;
    isSelected: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ option, onSelect, isSelected }) => {
    return (
        <TouchableOpacity
            onPress={onSelect}
            style={[styles.optionButton, isSelected && styles.selectedButton]}>
            <Text style={[styles.optionLabel, isSelected && styles.selectedOptionLabel]}>{option.label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    optionButton: {
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 7,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: colors.primaryColor,
    },
    selectedButton: {
        backgroundColor: colors.primaryColor,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
    },
    selectedOptionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.white,
    },
});

export default AnswerOption;