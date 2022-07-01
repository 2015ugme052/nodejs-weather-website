const request = require('request')

const forecast = (lat,long,callback) =>{
    
const url = 'http://api.weatherstack.com/current?access_key=8fda30cbde4776894a19936c3f6a0d13&query=' + encodeURIComponent(lat) + ',' +encodeURIComponent(long)


request({url: url, json: true}, (error,response) => {

    if(error){
      callback('Network Issue',undefined)
    }

    else if(!response.body.hasOwnProperty('current')){
      callback('wrong input',undefined)
    }

    else{
      callback('','It is currently   ' + response.body.current.temperature +'   degree out  ' + 'but it feels like   ' + response.body.current.feelslike)

    }  
  })
}

module.exports = forecast;