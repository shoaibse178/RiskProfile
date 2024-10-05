import { StyleSheet, Platform } from "react-native";
import colors from "../../assets/colors/Colors";

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

export default styles