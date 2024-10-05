import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../assets/colors/Colors';
import Strings from '../utils/Strings';
import CustomButton from './CustomButton';

interface ResultModalProps {
    isVisible: boolean;
    onClose: () => void;
    totalScore: number;
    name: string;
    riskLevel: string;
}

const ResultModal: React.FC<ResultModalProps> = ({ isVisible, onClose, name, totalScore, riskLevel }) => {
    return (
        <Modal
            isVisible={isVisible}
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <Text style={styles.title}>{Strings.HELLO}, {name}</Text>
                <Text style={styles.result}>{Strings.RESULTS}</Text>
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>{Strings.TOTAL_SCORE}:</Text>
                    <Text style={styles.score}>{totalScore}</Text>
                </View>
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>{Strings.RISK_LEVEL}:</Text>
                    <Text style={styles.riskLevel}>{riskLevel}</Text>
                </View>
                <View style={styles.buttonView}>
                    <CustomButton title={Strings.RESTART} onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        width: '90%',
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    result: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primaryColor,
    },
    riskLevel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.orange,
    },
    buttonView: {
        alignItems: 'center',
        marginTop: 20
    }
});

export default ResultModal;
