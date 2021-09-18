'use strict'
const express = require('express');
const app=express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

const PORT=process.env.PORT;
const handleWeather=require('./Weather');
const handleMovies=require('./Movies');
const weather =require('./modules/weather');
const MoviesModal = require('./modules/movie')


// app.get('/weather',handleWeather)
// app.get('/movies',handleMovies);

app.get('/',(req,res)=>{
  res.send('hello! i am working');
})

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
   weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.get('/movie', movieHandler);

function movieHandler(request,response){
  const query=request.query;
MoviesModal(query)
.then(summaries => response.send(summaries))
.catch((error)=>{
  console.error(error);
  response.status(200).send('Sorry. Something went wrong!')
})
}
app.listen(PORT,() => {console.log(`Server up on ${PORT}`)});


