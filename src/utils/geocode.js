const request = require('request')

const geocode = (address,callback) =>{

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiMjAxNXVnbWUwNTIiLCJhIjoiY2wzMW4wanNtMHltbjNwcHNiYzFqb3J1bCJ9.8sRb9bqZJB9WV9veQ-2OmA&limit=1'

request({url: url , json: true}, (error,response) => {

    if(error){
        callback('Network Issue',undefined)
    }

    else if(response.body.features.length == 0){
        callback('wrong input',undefined)
    }

    else{

        callback('', {latitude: response.body.features[0].center[0], longitude: response.body.features[0].center[1],location: response.body.features[0].place_name} )
    }  
  })
}
module.exports = geocode;