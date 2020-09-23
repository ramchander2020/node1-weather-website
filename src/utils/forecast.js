const request = require ('request')

const forecast = ({longitude, latitude}, callback) => {

    const weatherstackURL = 'http://api.weatherstack.com/current?access_key=e3fcb4905e98e6b7c20bb21bb832ffb1&query='+ longitude +','+ latitude +'&units=f'
    
   // console.log(weatherstackURL)

    request ({url: weatherstackURL, json: true}, (error, {body}) =>{

        if (error){
            callback ('Unable to access Weather Service', undefined)
        } else if (body.error){
            callback ('Invalid Location', undefined)
        } else {
            callback ( undefined, {
                feelslike : body.current.feelslike,
                temperature : body.current.temperature,
                weather_descriptions : body.current.weather_descriptions
            })
        }

    } )

}

module.exports = {

    forecast: forecast

}