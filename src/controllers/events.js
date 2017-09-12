const request = require('request');
require('env2')('./config.env');
const url = require('url');
const EventSearch = require("facebook-events-by-location-core");

exports.get = (req, res) => {
  if (req.query.input === 'geo') {
    let options = {};

    if (!req.query.lat || !req.query.lng) {
      res.status(500).json({
        message: 'Please specify the lat and lng parameters!'
      });
    } else if (!req.query.accessToken && !process.env.FEBL_ACCESS_TOKEN) {
      res.status(500).json({
        message: 'Please specify an Access Token, either as environment variable or as accessToken parameter!'
      });
    } else {

      if (req.query.lat) {
        options.lat = req.query.lat;
      }
      if (req.query.lng) {
        options.lng = req.query.lng;
      }
      if (req.query.distance) {
        options.distance = req.query.distance;
      }
      if (req.query.accessToken) {
        options.accessToken = req.query.accessToken;
      } else {
        options.accessToken = process.env.FEBL_ACCESS_TOKEN || null;
      }
      if (req.query.query) {
        options.query = req.query.query;
      }
      if (req.query.sort) {
        options.sort = req.query.sort;
      }
      if (req.query.version) {
        options.version = req.query.version;
      }
      if (req.query.since) {
        options.since = req.query.since;
      }
      if (req.query.until) {
        options.until = req.query.until;
      }

      const es = new EventSearch();
      es.search(options)
        .then((events) => {
          let responseObject = {};
          const eventArray = events.events.map((element) => {
            // console.log(events.events);
            const geocode = {
              lat: Number(element.venue.location.latitude),
              lng: Number(element.venue.location.longitude),
            };
            const event = {
              name: element.name,
              venue: element.venue.name,
              link: `https://www.facebook.com/events/${element.id}`,
              start: element.startTime,
              end: element.endTime,
            };
            // console.log(event);
            const eventInfo = `<h2><a href="${event.link}" target="_blank">${event.name}</a></h2><p>${event.venue}`;
            return {
              geocode,
              eventInfo,
            };
          });
          responseObject.eventArray = eventArray;
          responseObject.centre = {
            lat: req.query.lat,
            lng: req.query.lng,
          };
          res.json(responseObject);
        })
        .catch((error) => {
          res.status(500).json(error);
          console.log('');
        });
    }
  } else {
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.MAPS_API_KEY}`, (error, response, body) => {
      let centre = JSON.parse(body).results[0].geometry.location;
      let options = centre;

      if (req.query.distance) {
        options.distance = req.query.distance;
      }
      if (req.query.accessToken) {
        options.accessToken = req.query.accessToken;
      } else {
        options.accessToken = process.env.FEBL_ACCESS_TOKEN || null;
      }
      if (req.query.query) {
        options.query = req.query.query;
      }
      if (req.query.sort) {
        options.sort = req.query.sort;
      }
      if (req.query.version) {
        options.version = req.query.version;
      }
      if (req.query.since) {
        options.since = req.query.since;
      }
      if (req.query.until) {
        options.until = req.query.until;
      }

      // Override latitude/longitude data by uncommenting:
      // options.latitude = {{latitude you want}}
      // options.longitude = {{longitude you want}}
      const es = new EventSearch();
      es.search(options)
        .then((events) => {
          let responseObject = {
            centre,
          };
          const eventArray = events.events.map((element) => {
            // console.log(events.events);
            const geocode = {
              lat: element.venue.location.latitude,
              lng: element.venue.location.longitude,
            };
            console.log(geocode);
            const event = {
              name: element.name,
              venue: element.venue.name,
              link: `https://www.facebook.com/events/${element.id}`,
              start: element.startTime,
              end: element.endTime,
            };
            // console.log(event);
            const eventInfo = `<h2><a href="${event.link}" target="_blank">${event.name}</a></h2><p>${event.venue}`;
            return {
              geocode,
              eventInfo,
            };
          });
          responseObject.eventArray = eventArray;
          // console.log(eventArray);
          res.json(responseObject);
        })
        .catch((err) => {
          res.status(500).json(err);
          console.log('');
        });
    });
  }
};
