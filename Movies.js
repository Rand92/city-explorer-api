'use strict'
const express = require('express');
const app=express();
const cors = require('cors');
const axios =require("axios");
app.use(cors());
require('dotenv').config();

let handleMovies= async (req,res)=>{
   let query =req.query.query;
    let moviesUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
    let axiosMovies= await axios.get(moviesUrl);
    let movieList=axiosMovies.data.results;
    let moviesData=movieList.map(item=>{
        return new MoviesModal(item.title,item.overview,item.vote_count,item.vote_average,item.poster_path,item.popularity,item.release_date);
    }) 
    res.status(200).json(moviesData);
    
}




class MoviesModal{
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
module.exports =  handleMovies;