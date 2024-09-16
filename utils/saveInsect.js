import RNFS from 'react-native-fs';

const DATA_FILE_PATH = `${RNFS.DocumentDirectoryPath}/insects_data.json`;

export const saveInsectData = async (photoUri, insectData) => {
  try {
    // Déplacer l'image vers un répertoire persistant
    const newImagePath = `${RNFS.DocumentDirectoryPath}/image_${Date.now()}.jpg`;
    await RNFS.copyFile(photoUri, newImagePath);

    // Lire les données existantes
    let identifiedInsects = [];
    if (await RNFS.exists(DATA_FILE_PATH)) {
      const content = await RNFS.readFile(DATA_FILE_PATH, 'utf8');
      identifiedInsects = JSON.parse(content);
    }

    // Ajouter une nouvelle entrée
    const newEntry = { photo: newImagePath, insect: insectData };
    identifiedInsects.push(newEntry);

    // Sauvegarder les données mises à jour
    await RNFS.writeFile(DATA_FILE_PATH, JSON.stringify(identifiedInsects), 'utf8');

    console.log('Insecte et image sauvegardés avec succès.');
  } catch (error) {
    console.log('Erreur lors de la sauvegarde des données :', error);
  }
};

export const loadIdentifiedInsects = async () => {
  try {
    if (await RNFS.exists(DATA_FILE_PATH)) {
      const content = await RNFS.readFile(DATA_FILE_PATH, 'utf8');
      return JSON.parse(content);
    }
    return [];
  } catch (error) {
    console.log('Erreur lors du chargement des insectes :', error);
    return [];
  }
};

export const deleteInsect = async (index) => {
  try {
    const identifiedInsects = await loadIdentifiedInsects();
    if (index >= 0 && index < identifiedInsects.length) {
      // Supprimer l'image associée
      await RNFS.unlink(identifiedInsects[index].photo);

      // Supprimer l'entrée de la liste
      identifiedInsects.splice(index, 1);

      // Sauvegarder les données mises à jour
      await RNFS.writeFile(DATA_FILE_PATH, JSON.stringify(identifiedInsects), 'utf8');
      console.log('Insecte supprimé avec succès');
    }
  } catch (error) {
    console.log('Erreur lors de la suppression de l\'insecte :', error);
  }
};