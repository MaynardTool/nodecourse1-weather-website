const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/1ea2f74fe9a57d7d9adfa25bb1f110c0/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain." +
          body.daily.data[0].temperatureHigh +
          " is the high temperature." +
          body.daily.data[0].temperatureLow +
          " is the low temperature."
      );
    }
  });
};

module.exports = forecast;
