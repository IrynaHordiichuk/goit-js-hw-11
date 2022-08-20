import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import fetchImages from './fetch-pictures';

let currentPage = 1;
let currentValue = '';

const refs = {
  form: document.querySelector('#search-form'),
  //     input: document.querySelector('searchQuery'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

refs.loadMoreBtn.style.display = 'none';

refs.form.addEventListener('submit', submitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreHandler);


function submitHandler(event) {
  event.preventDefault();
  refs.loadMoreBtn.style.display = 'none';
  currentValue = event.currentTarget.elements.searchQuery.value;
  currentPage = 1;
  refs.gallery.innerHTML = '';
  fetchImages(currentPage, currentValue).then(data =>{
    if(data.data.hits.length === 0){
Notiflix.Report.info("Sorry, there are no images matching your search query. Please try again.");
return
    }
    
    galleryMarkup(data.data.hits);
    if(data.data.totalHits > 40){ 
      refs.loadMoreBtn.style.display = 'inline'
    }
});
}

function loadMoreHandler() {
  currentPage += 1;
  fetchImages(currentPage, currentValue).then(data =>{
    if((data.data.totalHits - currentPage * 40) <= 40){
      refs.loadMoreBtn.style.display = 'none';
      Notiflix.Report.warning("We're sorry, but you've reached the end of search results.");
    }
    console.log(data.data.totalHits);
    galleryMarkup(data.data.hits)
  }
  );
}

function galleryMarkup(array) {
  const markup = array
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
        <img src=${webformatURL} alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>${likes}</b>
          </p>
          <p class="info-item">
            <b>${views}</b>
          </p>
          <p class="info-item">
            <b>${comments}</b>
          </p>
          <p class="info-item">
            <b>${downloads}</b>
          </p>
        </div>
      </div>
      `;
      }
    )
    .join('');

  console.log(refs.gallery);
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
}

// Notiflix.Report.info("Sorry, there are no images matching your search query. Please try again.");
// Notiflix.Report.warning("We're sorry, but you've reached the end of search results.");
// Notiflix.Report.success("Hooray! We found totalHits images.");

// const refs = {
//     form: document.querySelector('#search-form'),
//     input: document.querySelector('searchQuery'),
//     gallery: document.querySelector('gallery'),
//     loadMoreBtn: document.querySelector('load-more'),
// }

// refs.form.addEventListener('submit', submitHandler);
// refs.loadMoreBtn.addEventListener('click', loadMoreHandler);

// const gallery = new SimpleLightbox('.gallery a', {
//     captions: true,
//     captionSelector: 'img',
//     captionPosition: 'bottom',
//     captionsData: 'alt',
//     captionDelay: 250,
//   });

//   function loadMoreHandler(){}

//   function submitHandler(event){
//     event.preventDefault();
//     const searchQuery = event.currentTarget.elements.query.value;
//     console.log(searchQuery);
//     api.fetchPictures(searchQuery)
//     .then (data => galleryMarkUp(data));
//   }

//   function galleryMarkup (){
//     refs.gallery.innerHTML = galleryTemplate(data);

//   }

//   function clearGallery(){}
