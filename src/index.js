import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages';

const search_window = document.querySelector('input[name="searchQuery"]');
const search_btn = document.querySelector('button[type="submit"]');
const imagesForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.getElementById('load-more');

let currentPage = 1;
let searchQuery = '';
let images = [];

// dodajemy obsluge do przycisku pobrania zdjec w formularzu
imagesForm.addEventListener('submit', e => {
  e.preventDefault();
  searchQuery = search_window.value;

  fetchImages(searchQuery, currentPage)
    .then(function (response) {
      images = response.data.hits;
      currentPage = 1;

      if (images.length == 0) {
        Notiflix.Notify.failure("There wasn't any images matching search.");
        return;
      }

      renderImages(images);

      Notiflix.Notify.info(
        `Udało się wyszukać : ${response.data.total} wyszukań`
      );
    })
    .catch(function (error) {
      Notiflix.Notify.failure('There was any error in request to api.');
    });
});

// dodajemy obsluge do przycisku ladowania kolejnych zdjec
loadMore.addEventListener('click', e => {
  // zwiekszamy numer strony
  currentPage += 1;
  //   ukrywamy przycisk ładowania kolejnych zdjec
  loadMore.classList.add('hidden');

  //   pobieramy zdjecia
  fetchImages(searchQuery, currentPage)
    .then(function (response) {
      let newImages = response.data.hits;

      //   jesli nie mamy zadnych zdjec wiecej
      if (newImages.length == 0) {
        Notiflix.Notify.failure('There was any error in request to api.');
        return;
      }

      images = images.concat(newImages);

      renderImages(images);
    })
    .catch(function (error) {
      Notiflix.Notify.failure("There wasn't any images matching search.");
    });
});

function renderImages(data) {
  gallery.classList.remove('hidden');
  loadMore.classList.remove('hidden');
  const galleryImages = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
            <a class="image-link" href="${largeImageURL}"> 
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes ${likes}</b>
                </p>
                <p class="info-item">
                    <b>Views ${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments ${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads ${downloads}</b>
                </p>
            </div>
        </div>`;
      }
    )
    .join('');
  gallery.innerHTML = galleryImages;

  createPreviewOfImages();
}

function createPreviewOfImages() {
  const lightbox = new SimpleLightbox('.gallery .photo-card a  ', {
    captions: true,
    captionsData: 'alt',
    captionsPosition: 'bottom',
    captionDeley: 250,
  });
}
