'use strict'
const express = require('express');
const app=express();
const cors = require('cors');
const axios =require("axios");
app.use(cors());
require('dotenv').config();
const ForeCast=require('../models/weather')

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





 module.exports =  handleWeather 
