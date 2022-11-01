const request = require('postman-request');
module.exports = (city, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=7c284cecfded7f9865f53be397d0487b&query=${city}&limit=1`;

    request({url, json: true}, (error, response) => {
        console.log(response.body)
        if(error) {
            callback("Unable to connect");
        }
        else if(response.body.error) {
            callback(response.body.error.message)
        }
        else if (!response.body.data.length) {
            callback("Unable to find location, try another search");
        }
        else {
            callback(null, 
                    {
                    latitude: response.body.data[0].latitude,
                    longitude: response.body.data[0].longitude,
                    location: response.body.data[0].label
                    });     
        }     
    }) 
};