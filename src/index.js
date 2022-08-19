import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
const axios = require('axios');
const DEBOUNCE_DELAY = 300;

Notiflix.Report.info("Sorry, there are no images matching your search query. Please try again.");
Notiflix.Report.warning("We're sorry, but you've reached the end of search results.");
Notiflix.Report.success("Hooray! We found totalHits images.");

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('searchQuery'),
    gallery: document.querySelector('gallery'),
    loadMoreBtn: document.querySelector('load-more'),
}

refs.form.addEventListener('submit', submitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreHandler);

const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img',
    captionPosition: 'bottom',
    captionsData: 'alt',
    captionDelay: 250,
  });


  function loadMoreHandler(){}

  function submitHandler(event){
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.query.value;
    console.log(searchQuery);
    api.fetchPictures(searchQuery)
    .then (data => galleryMarkUp(data));
  }

  function galleryMarkup (){
    refs.gallery.innerHTML = galleryTemplate(data);

  }

  function clearGallery(){}