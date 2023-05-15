export { fetchImages };
import axios from 'axios';

const API_KEY = '36382729-c052200aae6cb40748bb0f135';
const API_URL = 'https://pixabay.com/api/';

async function fetchImages(searchTerm, page) {
  const config = {
    params: {
      key: API_KEY,
      q: searchTerm,
      image_type: 'photo', // wartość musi być przekazana jako ciąg znaków w cudzysłowie
      orientation: 'horizontal', // wartość musi być przekazana jako ciąg znaków w cudzysłowie
      safesearch: true,
      per_page: 40,
      page: page,
    },
  };

  //pobieramy zdjecia
  return await axios.get(API_URL, config);
}
