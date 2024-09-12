import {StyleSheet} from 'react-native';

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
  homeTitle: {
    color: 'white',
    fontSize: 52,
    marginTop: 40,
    textAlign: 'center',
  },
  logo: {
    width: 300,
    objectFit: 'contain',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  photoButton: {
    color: 'black',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 160,
    marginHorizontal: 40,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 160,
    marginTop: 50,
  },
  imageTaken: {
    width: 80,
    height: 100,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 5,
    position: 'absolute',
    zIndex: 3,
    top: 180,
    left: 10,
  },
  image: {
    width: 400,
    height: 300,
    objectFit: 'contain',
  },
  infoContainer: {
    backgroundColor: '#EBEBEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: [
        { translateY: -10 }, 
      ],
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  text: {
    fontSize: 14,
    marginHorizontal: 15,
    backgroundColor: 'red',
  },
  toggle: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    alignItems: 'center',
    marginBottom: 35,
    width: 320,
  },
});

export default styles;
