'use strict';
let cache = require('../modules/cache');
const axios = require('axios');
const MoviesModal =require('../Movies')
const movieList =require('../Movies')

function getMovies(query) {
    const key = 'movies-' + query;
    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;

    if (cache[key]) {
        console.log('Cache hit');
    } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].data = axios.get(moviesUrl)
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