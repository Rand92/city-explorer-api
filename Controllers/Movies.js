'use strict'
const express = require('express');
const app=express();
const cors = require('cors');
const axios =require("axios");
app.use(cors());
require('dotenv').config();
const MoviesModel =require('../models/movies')

let handleMovies= async (req,res)=>{
    let query =req.query.query;
    let moviesUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
    let axiosMovies= await axios.get(moviesUrl);
    let movieList=axiosMovies.data;
    let moviesData=movieList.results.map(item=>{
        return new MoviesModel(item.title,item.overview,item.vote_count,item.vote_average,item.poster_path,item.popularity,item.release_date);
    })
    res.status(200).json(moviesData);
}
app.get('/movies',handleMovies);



module.exports =  handleMovies ;