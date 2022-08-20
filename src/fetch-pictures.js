

import axios from 'axios';

export default async function fetchImages( page, searchQuery){

axios.defaults.baseURL = 'https://pixabay.com/api/';
const PER_PAGE = 40;
const KEY = '29377989-ce3619f612f3ee2439940f074';

    return await axios.get(`?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`);

}
