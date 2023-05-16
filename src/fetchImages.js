export { fetchImages };
import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '36382729-c052200aae6cb40748bb0f135';
const API_URL = 'https://pixabay.com/api/';

async function fetchImages(searchTerm, page) {
  try {
    const config = {
      params: {
        key: API_KEY,
        q: searchTerm,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    };

    return await axios.get(API_URL, config);
  } catch (error) {
    throw Notiflix.Notify.error('Wystąpił błąd podczas pobierania zdjęć.');
  }
}
