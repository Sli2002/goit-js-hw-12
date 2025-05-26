import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalImages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const input = e.target.elements['search-text'];
  query = input.value.trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalImages = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'No images found',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const imagesPerPage = data.hits.length;
    const totalPages = Math.ceil(totalImages / imagesPerPage);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to fetch images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const imagesPerPage = data.hits.length;
    const totalPages = Math.ceil(totalImages / imagesPerPage);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    }

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
