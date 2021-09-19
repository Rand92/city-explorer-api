'use strict';
let cache = require('../modules/cache');
const axios = require('axios');


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
let movieSummaries = [];
function parseMovies(movieList) {
    try {
        // console.log(moviesData)
        movieSummaries = movieList.results.map(item => {
            return new MoviesModel(item.title);
        });
        module.exports = { movieSummaries }

        return Promise.resolve(movieSummaries);
    } catch (e) {
        return Promise.reject(e);
    }

}

class MoviesModel{
    constructor(title,overview,total_votes,average_votes,image_url,popularity,released_on){
     this.title=title;
     this.overview=overview;
     this.total_votes=total_votes;
     this.average_votes=average_votes;
     this.image_url=image_url;
     this.popularity=popularity;
     this.released_on=released_on
   
    }
} 
module.exports = getMovies;