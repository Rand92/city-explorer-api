'use strict';
let cache = require('./cache.js');
const axios = require('axios');
const MoviesModal =require('../Movies')

function getMovies(query) {
    const key = 'movies-' + query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
    } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
            .then(response => parseMovies(response.data));
    }

    return cache[key].data;
}
let movieSummaries = {};
function parseMovies(movieList) {
    try {
        movieSummaries = movieList.results.map(item => {
            return new MoviesModal(item.title);
        });
        module.exports = { movieSummaries }

        return Promise.resolve(movieSummaries);
    } catch (e) {
        return Promise.reject(e);
    }

}


module.exports = getMovies;