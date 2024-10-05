import { StyleSheet } from "react-native";
import colors from "../../assets/colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 30,
  },
  viewTitleText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 19,
  },
  text: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 19,
  },
  buttonContainer: {
    alignItems: 'center',
    bottom: 10
  },
});

export default styles;