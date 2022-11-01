const request = require('postman-request');
module.exports = getForecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d872672ee8fa08226a5066a3027514ef&query=${latitude},${longitude}`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to the API, check your connection")
        }
        else if (body.error) {
            callback("Unable to find location");
        }
        else {
            callback(null, 
                    {
                        temperature: body.current.temperature,
                        precip: body.current.precip
                    })
           
        }
    })
};