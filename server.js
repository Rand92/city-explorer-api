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
const handleWeather=require('./Weather')
const handleMovies=require('./Movies')
app.get('/',(req,res)=>{
    res.status(200).json({"message":"I'm working"})
})

app.get('/weather',handleWeather)


app.get('/movies',handleMovies);




app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
 });
 
