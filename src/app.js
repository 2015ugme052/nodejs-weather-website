const path = require('path')
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.port || 3000

const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('views', viewPath)
app.set('view engine' , 'hbs')
app.use(express.static(publicPath))
hbs.registerPartials(partialPath)

app.get('', (req,res) =>{
    res.render('index', {
        title: "Weather",
        name: "Bhawesh"
    })
})
app.get('/help', (req,res) =>{
    res.render('help', {
        title: "Help",
        name: "Bhawesh"
    })
})
app.get('/about', (req,res) =>{
    res.render('about', {
        title: "About",
        name: "Bhawesh"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        res.send({
            error: "please provide address"
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error});
        }
            forecast(latitude,longitude,(error,data) =>{
                if(error){
                   return res.send({error});
                }
                else{
                    return res.send({
                        forecast: data,
                        address: location,
                        location: req.query.address
                    })
                }
            })
        })
    

    
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        name: "Bhawesh",
        error: "Help page not available"
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        name: "Bhawesh",
        error : "page not found"
    })
})



app.listen(port, ()=>{
    console.log("server is listening on port "+ port)
});
