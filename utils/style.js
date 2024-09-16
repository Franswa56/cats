import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,

    
  },
  background: {
    flex: 1,
    position: 'relative',
    width: '100%',

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
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 160,
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
  result: {
    position: 'relative',
    flex: 1,
  },
  imageTaken: {
    width: 80,
    height: 100,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 5,
    position: 'absolute',
    zIndex: 3,
    top: 170,
    left: 10,
  },
  image: {
    width: 360,
    height: 340,
    objectFit: 'cover',
    position: 'relative',

  },
  infoContainer: {
    backgroundColor: '#EBEBEB',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30, 
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginTop: -22, 
    width: 360, 
    gap: 25,
  },
  nameContainer: {
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 5,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  toggleText: {
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    width: '95%',
    
  },
  text: {
    fontSize: 16,
    marginHorizontal: 15,
    backgroundColor: '#C9C9C9',
    padding: 15,
    borderRadius: 10,
    marginTop: -10,
  },
  toggle: {
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    alignItems: 'center',
    width: '95%',
    zIndex: 3,
    activeOpacity: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center',     // Centre horizontalement
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optionnel, pour assombrir légèrement l'arrière-plan
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  loaderText: {
    fontSize: 26,
    color: '#000',
    marginTop: 40,
    textAlign: 'center',
  },


  /// Bibliotheque styles ////
  zooOverlay: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)', // Couleur avec transparence
    zIndex: 5, // S'assurer que l'élément est au-dessus
  },
  zooTitle: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 45,
  },
  insectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insectCard: {
    width: '90%',  // Chaque carte prend 30% de la largeur pour avoir trois cartes par ligne
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 15,  // Espacement en bas des cartes
    alignItems: 'center',
    height: 220,
  
  },
  insectImage: {
    width: '100%',  // Largeur temporaire pour tester
    height: 150, 
  },
  insectName: {
    height: 25,
    textAlign: 'center',
  },
});

export default styles;
