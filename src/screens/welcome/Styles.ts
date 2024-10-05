import { StyleSheet } from "react-native";
import colors from "../../assets/colors/Colors";

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  viewWelcomeDescription: {
    alignItems: 'center',
    width: '85%',
  },
  welcomeView: {
    height: 200,
    width: 200,
    borderWidth: 7,
    borderColor: colors.primaryColor,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    color: colors.black,
    fontSize: 23,
    fontWeight: '600',
  },
  description: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 20,
    textAlign: 'left',
    lineHeight: 25,
  },
  viewNameInput: {
    width: '85%',
  },
  name: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1.5,
    padding: 11,
    width: '100%',
    borderRadius: 20,
    borderColor: colors.primaryColor,
    color: colors.black
  },
  error: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom:10
  },
});

export default styles;