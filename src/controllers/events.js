require('env2')('./config.env');
const EventSearch = require("facebook-events-by-location-core");

exports.get = (req, res) => {
  if (!req.query.lat || !req.query.lng) {
    res.status(500).json({
      message: "Please specify the lat and lng parameters!"
    });
  } else if (!req.query.accessToken && !process.env.FEBL_ACCESS_TOKEN) {
    res.status(500).json({
      message: "Please specify an Access Token, either as environment variable or as accessToken parameter!"
    });
  } else {

    var options = {};

    // Add latitude
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
    // Instantiate EventSearch
    var es = new EventSearch();

    // Search and handle results
    es.search(options).then(function(events) {
      res.json(events);
    }).catch(function(error) {
      res.status(500).json(error);
    });
  }
};
