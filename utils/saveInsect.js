import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveInsectData = async (photoUri, insectData) => {
  try {
    const storedData = await AsyncStorage.getItem('identifiedInsects');
    const identifiedInsects = storedData ? JSON.parse(storedData) : [];

    const newEntry = { photo: photoUri, insect: insectData };
    identifiedInsects.push(newEntry);

    await AsyncStorage.setItem('identifiedInsects', JSON.stringify(identifiedInsects));
  } catch (error) {
    console.log('Erreur lors de la sauvegarde des données :', error);
  }
};

export const loadIdentifiedInsects = async () => {
  try {
    const storedData = await AsyncStorage.getItem('identifiedInsects');
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.log('Erreur lors du chargement des données :', error);
    return [];
  }
};
