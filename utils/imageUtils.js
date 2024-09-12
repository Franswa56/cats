import RNFS from 'react-native-fs';
import axios from 'axios';

export const convertToBase64 = async (photoUri) => {
  try {
    return await RNFS.readFile(photoUri, 'base64');
  } catch (error) {
    throw new Error("Erreur de conversion de l'image.");
  }
};

export const identifyInsect = async (base64Image, API_KEY) => {
  try {
    const response = await axios.post(
      'https://insect.kindwise.com/api/v1/identification?details=common_names,url,description,image',
      {
        images: [`data:image/jpeg;base64,${base64Image}`],
        latitude: 49.207, // À adapter avec des données dynamiques si besoin
        longitude: 16.608,
        similar_images: true,
      },
      {
        headers: {
          'Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.result.classification.suggestions[0];
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
