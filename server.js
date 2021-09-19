'use strict'
const express = require('express');
const app=express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

const PORT=process.env.PORT;
const handleWeather=require('./Controllers/Weather')
const handleMovies=require('./Controllers/Movies')
app.get('/',(req,res)=>{
  res.send('hello! i am working');
})

app.get('/weather', handleWeather);

// function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//    weather(lat, lon)
//   .then(summaries => response.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }  

app.get('/movie', handleMovies);

// function movieHandler(request,response){
//   const query=request.query;
// MoviesModal(query)
// .then(summaries => response.send(summaries))
// .catch((error)=>{
//   console.error(error);
//   response.status(200).send('Sorry. Something went wrong!')
// })
// }
app.listen(PORT,() => {console.log(`Server up on ${PORT}`)});


