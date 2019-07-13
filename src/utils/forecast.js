const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/8a08b447d75712408cdc0b08706994ef/' + latitude + ',' + longitude

    //console.log(url)

    request({ url : url, json : true}, (error,response) =>{
        if( error){
            console.log(error)
            callback('Unable to connect to weather service', undefined)
        } else if( response.body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature+ ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast