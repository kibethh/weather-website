const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=64e6af803f0daedb970de559c6fbbe76&query=" + latitude + "," + longitude + "  & units = f";
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services!!", undefined);
        } else if (body.error) {
            callback("Unable to connect to find location!!", undefined);
        } else {
            callback(undefined, body.current.weather_descriptions [0] + ".It is currently " + body.current.temperature + " degree out. it feels like " + body.current.feelslike + " degrees out.The observation was done at: "+body.current.observation_time);
    }
    });
};
module.exports = forecast;