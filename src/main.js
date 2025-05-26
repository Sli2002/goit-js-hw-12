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
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query' });
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
      iziToast.info({ message: 'No images found' });
      return;
    }

    createGallery(data.hits);

    if (totalImages > 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to fetch images' });
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

    const totalPages = Math.ceil(totalImages / 20);
    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({ message: 'Error loading more images' });
  } finally {
    hideLoader();
  }
});
