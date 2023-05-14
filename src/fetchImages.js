export { fetchImages };
import Notiflix from 'notiflix';
import axios from 'axios';

const search_window = document.querySelector('input[name="searchQuery"]');
var API_KEY = '36382729-c052200aae6cb40748bb0f135';
var URL =
  'https://pixabay.com/api/?key=' +
  API_KEY +
  '&q=' +
  encodeURIComponent(search_window.value);

const searchTerm = search_window.value.trim();

const config = {
  params: {
    key: '36382729-c052200aae6cb40748bb0f135',
    q: searchTerm,
    image_type: 'photo', // wartość musi być przekazana jako ciąg znaków w cudzysłowie
    orientation: 'horizontal', // wartość musi być przekazana jako ciąg znaków w cudzysłowie
    safesearch: true,
    per_page: 40,
    page: 1,
  },
};

const fetchImages = async () => {
  try {
    const response = await axios.get(URL, config);

    Notiflix.Notify.info(`${response.data}`);
  } catch (error) {
    Notiflix.Notify.warning('Sorry, something went wrong');
  }
};
