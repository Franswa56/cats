import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
    },
    page: {
      flexGrow: 1, // Permet au contenu du ScrollView de croître et de pouvoir défiler
      alignItems: 'center',
    },
    logo: {
      width: 300,
      objectFit: 'contain',
    },
    buttonContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    button: {
      width: 119,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageTaken: {
      width: 200,
      height: 200,
      borderRadius: 45,
      margin: 20,
      objectFit: 'contain',
      border: 'red',
    },
    image: {
      width: 300,
      height: 300,
      margin: 20,
      borderRadius: 25,
    },
    textTitle: {
      fontWeight: 'bold',
      fontSize: 24,
      marginHorizontal: 15,
      marginVertical: 5,
    },
    text: {
      fontSize: 14,
      marginHorizontal: 15,
    },
    toggle: {
      backgroundColor: 'white',
      margin: 5,
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 15,
      alignItems: 'center',
    },
  });

  export default styles