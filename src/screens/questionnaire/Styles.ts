import { StyleSheet } from "react-native";
import colors from "../../../res/themes/Colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerText: {
      color: colors.headerText,
      fontSize: 16,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    questionText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
    },
    button: {
      backgroundColor: colors.white,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: colors.black,
    },
    nextButton: {
      backgroundColor: colors.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      // padding:15,
      width:'45%',
      // marginHorizontal:5,
      // width: 100,
      borderRadius: 20,
    },
    nextButtonText: {
      fontSize: 18,
      color: colors.white,
    },
    header: {
      backgroundColor: colors.primaryColor,
      height: 100,
      alignItems:'center',
      justifyContent:'flex-end',
      // justifyContent: 'space-between',
      // alignItems: 'flex-end',
      // flexDirection: 'row',
      paddingBottom:10
    },
    progress: {
      height:60,
      width:60,
      // borderWidth:1,
      // borderColor:colors.primaryColor,
      alignSelf:'flex-end',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:colors.primaryColor,
      borderRadius:30,
      top:10,
      right:10,
      // padding:30,
      // marginTop: 35,
      // marginHorizontal: 20,
      // alignSelf: 'center',
    },
    buttonContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-evenly',
      // position: 'absolute',
      bottom: 40,
      // right: 10,
    },
  });

  export default styles