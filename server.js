'use strict'
const express = require('express');
const app=express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weather=require('./data/weather.json');
const { response } = require('express');
const PORT=process.env.PORT;

app.get('/weather',(req,res)=>{
    let lat=Number(req.query.lat);
    let lon=Number(req.query.lon);
    if (lat&&lon){
        let result=weather.find(elem=> elem.lat===lat && elem.lon===lon)
       
            let foreCast=result.data.map(item=>{
                return {
                    date:item.datetime,
                    description:item.weather.description,
                    cityName:result.city_name
                }
            })
            res.status(200).json(foreCast);
      

    }else{
        res.status(500).send("please provide correct query params");
    }
})



app.listen(PORT,()=>{
    console.log(`listening on port ${PORT} `)
});