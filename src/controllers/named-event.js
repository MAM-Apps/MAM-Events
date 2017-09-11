const request = require('request');
require('env2')('./config.env');

exports.get = (req, res) => {
  
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.MAPS_API_KEY}`, (error, response, body) => {
    let geoCode = JSON.parse(body).results[0].geometry.location;
  });
};
