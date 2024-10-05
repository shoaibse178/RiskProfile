import { StyleSheet } from "react-native";
import colors from "../../assets/colors/Colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    name:{
      alignSelf: 'center',
      fontWeight: 'bold',
      color: colors.white,
      fontSize:22,
      paddingVertical:20,
    },
    viewTitleText:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingVertical:5,
    },
    scoreView:{
      backgroundColor:colors.primaryColor,
      borderRadius:40,
      justifyContent:'center',
      marginBottom:80,
      paddingHorizontal:20,
      paddingBottom:20,
      paddingTop:50,

    },
    title: {
      color: colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize:20,
    },
    text: {
      color: colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize:20,
    },
    buttonContainer: {
      alignItems:'center',
      justifyContent:'center',
      marginTop:70
    },
  });

  export default styles;