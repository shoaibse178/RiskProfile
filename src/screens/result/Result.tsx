import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Styles';
import CustomButton from '../../components/CustomButton';
import Strings from '../../utils/Strings';
import { resetActions } from '../../navigation/NavigationServices';
import { resetUserState } from '../../redux/reducers/AnswersReducer';
import { RootState } from '../../redux/store';
import colors from '../../assets/colors/Colors';

interface UserData {
    score: number;
    riskLevel: string;
}

interface RouteParams {
    userData: UserData;
}

interface ResultProps {
    route: {
        params: RouteParams;
    };
}


const Result: React.FC<ResultProps> = ({ route }) => {
    const dispatch = useDispatch();
    const [totalScore, setTotalScore] = useState<number>(0);
    const [riskLevel, setRiskLevel] = useState<string>('');
    const { name } = useSelector((state: RootState) => state.answers);

    useEffect(() => {
        const { score, riskLevel } = route?.params?.userData;
        setTotalScore(score);
        setRiskLevel(riskLevel);
    }, []);


    return (
        <View style={styles.container}>
            <View style={{
                flex: 0.25, alignItems: 'center',
                justifyContent: 'center'

            }}>
                <Text style={styles.name}>{Strings.HELLO}, {name}</Text>
            </View>

            <View style={{
                flex: 0.75, backgroundColor: 'white',
                paddingTop: 20, borderTopRightRadius: 25, borderTopLeftRadius: 25,
                paddingHorizontal: 20, borderTopWidth: 15, borderColor: colors.primaryColor,
                borderLeftWidth: 1, borderRightWidth: 1,

            }}>
                <View style={styles.viewTitleText}>
                    <Text style={styles.title}>{Strings.TOTAL_SCORE}:</Text>
                    <Text style={styles.text}>{totalScore}</Text>
                </View>
                <View style={styles.viewTitleText}>
                    <Text style={styles.title}>{Strings.RISK_LEVEL}:</Text>
                    <Text style={styles.text}>{riskLevel}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={Strings.RESTART}
                    onPress={() => {
                        dispatch(resetUserState());
                        resetActions('Welcome');
                    }}
                />
            </View>
        </View>
    );
};

export default Result;
