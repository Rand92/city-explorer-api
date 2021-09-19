'use strict'
const express = require('express');
const app=express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

const PORT=process.env.PORT;
const weather=require('./modules/weather')
const movie=require('./modules/movie')
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

app.get('/movies', movieHandler);

function movieHandler(request,response){
  const {query}=request.query;
movie(query)
.then(summaries => response.send(summaries))
.catch((error)=>{
  console.error(error);
  response.status(200).send('Sorry. Something went wrong!')
})
}
app.listen(PORT,() => {console.log(`Server up on ${PORT}`)});


