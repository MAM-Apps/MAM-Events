const request = require('request');
require('env2')('./config.env');
const url = require('url');
const EventSearch = require("facebook-events-by-location-core");

exports.get = (req, res) => {
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

    const es = new EventSearch();
    es.search(options)
      .then((events) => {
        let responseObject = {
          centre,
        };
        const eventArray = events.events.map((element) => {
          console.log(events.events);
          const geocode = {
            lat: element.venue.location.latitude,
            lng: element.venue.location.longitude,
          };
          const event = {
            name: element.name,
            venue: element.venue.name,
            link: `https://www.facebook.com/events/${element.id}`,
            start: element.startTime,
            end: element.endTime,
          }
          const eventInfo = `<h2><a href="${event.link}" target="_blank">${event.name}</a></h2><p>${event.venue}`;
          return { geocode, eventInfo };
        });
        responseObject.eventArray = eventArray;
        // console.log('eventArray', eventArray);

        res.json(responseObject);
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log('');
      });
  });
};
