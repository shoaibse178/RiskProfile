import { StyleSheet } from "react-native";
import colors from "../../assets/colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
  },
  viewName: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 30,
  },
  viewScoreRiskLevel: {
    flex: 0.75,
    backgroundColor: 'white',
    paddingTop: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 20,
    borderTopWidth: 15,
    borderColor: colors.primaryColor,
    borderLeftWidth: 1,
    borderRightWidth: 1,
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