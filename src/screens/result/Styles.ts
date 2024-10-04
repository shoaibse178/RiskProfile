import { StyleSheet } from "react-native";
import colors from "../../res/themes/Colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scoreView:{
      flex:0.35,
      backgroundColor:colors.primaryColor,
      borderBottomRightRadius:40,
      borderBottomLeftRadius:40,
      justifyContent:'center'
    },
    riskDescriptionView:{
      flex:0.5,   
      paddingHorizontal:15,
      alignItems:'center',
      paddingTop:20,   
    },
    scoreText: {
      alignSelf: 'center',
      fontWeight: 'bold',
      color: colors.white,
      fontSize:70
    },
    feedbackText: {
      color: colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize:20,
    },
    descriptionText:{
      fontSize:16,
      lineHeight:30
    },
    buttonContainer: {
      flex:0.15,
      alignItems:'center',
      justifyContent:'center',
    },
  });

  export default styles;