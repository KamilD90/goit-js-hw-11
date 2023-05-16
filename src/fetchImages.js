export { fetchImages };
import axios from 'axios';

// const API_KEY = '36382729-c052200aae6cb40748bb0f135';
// const API_URL = 'https://pixabay.com/api/';

// async function fetchImages(searchTerm, page) {
//   const config = {
//     params: {
//       key: API_KEY,
//       q: searchTerm,
//       image_type: 'photo', // wartość musi być przekazana jako ciąg znaków w cudzysłowie
//       orientation: 'horizontal', // wartość musi być przekazana jako ciąg znaków w cudzysłowie
//       safesearch: true,
//       per_page: 40,
//       page: page,
//     },
//   };

//   //pobieramy zdjecia
//   return await axios.get(API_URL, config);
// }

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

    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw Notiflix.Notify.error('Wystąpił błąd podczas pobierania zdjęć.');
  }
}
