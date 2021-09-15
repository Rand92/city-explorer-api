'use strict'
const express = require('express');
const app=express();
const cors = require('cors');
const axios =require("axios");
app.use(cors());
require('dotenv').config();
// const weather=require('./data/weather.json');
// const { response } = require('express');
const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.status(200).json({"message":"I'm working"})
})

let handleWeather= async (req,res)=>{
    let lat=req.query.lat;
    let lon=req.query.lon;
    let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&key=${process.env.WEATHERBIT_API_KEY}&lon=${lon}`;
    let axiosResponse= await axios.get(url);
    let weatherData=axiosResponse.data;
    let cleanedData=weatherData.data.map(item=>{
        return new ForeCast(item.datetime,item.weather.description);
    })
    res.status(200).json(cleanedData);
}
app.get('/weather',handleWeather)


// Model
class ForeCast{
    constructor(date,description){
        this.date=date;
        this.description=description
    }
} 
let handleMovies= async (req,res)=>{
    let query =req.query.query;
    let moviesUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
    let axiosMovies= await axios.get(moviesUrl);
    let movieList=axiosMovies.data;
    let moviesData=movieList.results.map(item=>{
        return new MoviesModal(item.title,item.overview,item.vote_count,item.vote_average,item.poster_path,item.popularity,item.release_date);
    })
    res.status(200).json(moviesData);
}
app.get('/movies',handleMovies);



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

app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
 });
 
