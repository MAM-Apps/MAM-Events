const request = require('request');
require('env2')('./config.env');
const url = require('url');
const EventSearch = require('facebook-events-by-location-core');

const getTimeStamp = require('./timeButtons.js')

exports.get = (req, res) => {
  console.log(req.query.input);
  if (req.query.input === 'geo') {
    const options = fillOptions(req.query);
    options.until = getTimeStamp(req.query.timemethod);
    console.log(options.until);
    const es = new EventSearch();
    es.search(options)
      .then((events) => {
        const responseObject = {};
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
};

const fillOptions = (query) => {
  let options = {};
  if (query.lat) {
        options.lat = query.lat;
    }
    if (query.lng) {
        options.lng = query.lng;
    }
  if (query.distance) {
    options.distance = query.distance;
  }
  if (query.accessToken) {
    options.accessToken = query.accessToken;
  } else {
    options.accessToken = process.env.FEBL_ACCESS_TOKEN || null;
  }
  if (query.query) {
    options.query = query.query;
  }
  if (query.sort) {
    options.sort = query.sort;
  }
  if (query.version) {
    options.version = query.version;
  }
  if (query.since) {
    options.since = query.since;
  }
  if (query.until) {
    options.until = query.until;
  }
  return options;
};
