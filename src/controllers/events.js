const request = require('request');
require('env2')('./config.env');
const url = require('url');
const EventSearch = require('facebook-events-by-location-core');

exports.get = (req, res) => {
  console.log(req.query.input);
  if (req.query.input === 'geo') {
    
    // if (!req.query.lat || !req.query.lng) {
    //   res.status(500).json({
    //     message: 'Please specify the lat and lng parameters!',
    //   });
    // } else if (!req.query.accessToken && !process.env.FEBL_ACCESS_TOKEN) {
    //   res.status(500).json({
    //     message: 'Please specify an Access Token, either as environment variable or as accessToken parameter!',
    //   });
    // } else {
    const options = fillOptions(req.query);
    if (req.query.lat) {
      options.lat = req.query.lat;
    }
    if (req.query.lng) {
      options.lng = req.query.lng;
    }
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
  } else {
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.MAPS_API_KEY}`, (error, response, body) => {
      let options = fillOptions(req.query);
      options.centre = JSON.parse(body).results[0].geometry.location;
      options.lat = options.centre.lat;
      options.lng = options.centre.lng;
      
      // Override latitude/longitude data by uncommenting:
      // options.latitude = {{latitude you want}}
      // options.longitude = {{longitude you want}}
      const es = new EventSearch();
      es.search(options)
        .then((events) => {
          let responseObject = {
            centre: options.centre,
          };
          console.log(responseObject);
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

const fillOptions = (query) => {
  let options = {};

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
