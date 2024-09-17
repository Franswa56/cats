import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


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
    fontSize: width*0.15,
    marginTop: height * 0.1,
    textAlign: 'center',   
  },
  backButton: {
    position: 'absolute',
    left: 5,
    top: 5,
    zIndex: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 160,
  },
  logo: {
    width: width*0.8,
    objectFit: 'contain',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: height*0.06
  },
  photoButton: {
    color: 'black',
    width: width*0.3,
    height: width*0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 160,
    marginHorizontal: 40,
  },
  button: {
    width: width*0.15,
    height: width*0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 160,
    marginTop: 50,
  },
  insectFiche: {
    flexGrow: 1,
    top: 0,
  },
  animatedContainer: {
    flex: 1,
  },
  result: {
    flexGrow: 1,
    height: height,
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
    width: width,
    height: height*0.45,
    objectFit: 'cover',
    position: 'relative',

  },
  infoContainer: {
    backgroundColor: '#EBEBEB',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30, 
    paddingBottom: 10,
    flexGrow: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginTop: - height*0.035, 
    width: width,
    minHeight: height*0.58,
    gap: height*0.025,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: height*0.02,
  },
  name: {
    fontWeight: 'bold',
    fontSize: width*0.1,
    marginBottom: 5,
    marginTop: height*0.025,
    textAlign: 'center',
    color: "#545454",
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 15,
    marginVertical: 5,
    color: "#545454"
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
    color: "#545454",
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
  credits: {
    //marginTop: height*0.05,
    //marginBottom: height*0.03,
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
    width: '80%', 
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 15,  // Espacement en bas des cartes
    alignItems: 'center',
    height: 'auto', 
    elevation: 15,
  },
  insectImage: {
    width: '90%',  // Largeur temporaire pour tester
    height: 250,
    objectFit: 'contain', 
  },
  insectName: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    height: 30,
  },
  deleteButton: {
  },
});

export default styles;
