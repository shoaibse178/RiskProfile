import { StyleSheet } from "react-native";
import colors from "../../res/themes/Colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryColor,
    },
    title: {
      color: colors.white,
      fontSize: 30,
      fontWeight: 'bold',
    },
  });

  export default styles;