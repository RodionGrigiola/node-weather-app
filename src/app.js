//Starting point of the application

/*
console.log(__dirname) // contains a path to the folder where current script
console.log(__filename) shows the path to this file
*/

/*----  Requiring module and using express ------*/
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getForecast = require('./utils/getForecast')

const app = express()
const port = process.env.PORT || 3000 // for HEROKU

/*----  Setting up paths for static folder and view engine ------*/
const publicFolderPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') // setup the view engine for express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)  


/*----  ROUTING ------*/

app.use(express.static(publicFolderPath)) // serving static folder for root route

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Roro'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Roro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help page! Get out!',
        title: 'Help',
        name: 'Roro'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) return res.send('Please provide the address') 

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) return res.send(error)
    
        getForecast(latitude, longitude, (error, {temperature:forecast, precip:precipitation} = {}) => {
            if(error) return res.send("error: ", error);

            res.send({
               forecast,
               precipitation,
               location,
            })
        })
        
    })

    
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'No help',
        name: 'Roro',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Roro',
        errorMessage: 'Page not found'
    })
})


//server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

