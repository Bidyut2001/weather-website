const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname,'../public'))

// define path for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup statis directory to serve
app.use(express.static(publicDir))


app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name:'bidyut'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Bidyut'
    })
})

/* app.get('', (req, res) => {
  
    res.send('Hello Express!')
}) */

app.get('/help',(req, res)=>{
    res.render('help',{
        helpText:'Help required',
        title:'Help',
        name:'Bidyut'
    })
})

// app.get('/about',(req, res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })   
    }
    // res.send({
    //     forecast : 'It is raining',
    //     location: 'kolkata',
    //     address: req.query.address
    // })

    geocode(req.query.address, (error, {latitude,longitude,location}={}) =>{
        if(error){
           return res.send({error})
        }
        forecast(latitude, longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast : forecastData,
                location,
                address:req.query.address
            })
        })
    })
})


app.get('/products',(req, res)=>{
    //console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search criteria'
        }) 
    }
    res.send({
        product: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Bidyut',
        errorMessage:'Help Page Not found'
    })
})
  

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Bidyut',
        errorMessage:'Page Not found'
    })
})

app.listen(3000, () =>{
    console.log('server is up on port 3000')
})