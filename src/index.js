import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages';

const search_window = document.querySelector('input[name="searchQuery"]');
const search_btn = document.querySelector('button[type="submit"]');
const imagesForm = document.getElementById('#search-form');
const gallery = document.querySelector('.gallery');
const searchTerm = search_window.value.trim();

imagesForm.addEventListener('submit', handleInput(searchTerm));
console.log(imagesForm);

function handleInput(searchTerm) {
  if (searchTerm) {
    gallery.innerHTML = '';
    $.getJSON(URL, function (data) {
      if (parseInt(data.totalHits) > 0)
        Notiflix.Notify.info(`Znaleźliśmy ${data.totalHits} wyszukań`);
      //     $.each(data.hits, function (i, hit) {
      //       console.log(hit.pageURL);
      //     });
      //   } else Notiflix.Notify.alert('No hits');
      // });
      else Notiflix.Notify.alert('No hits');
    });
    fetchImages(searchTerm);
    renderImages(data);
  } else gallery.innerHTML = '';
}

function renderImages(data) {
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
        return `<div class="photo-card">
       <a class="image-link href="${largeImageURL}> <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
}
