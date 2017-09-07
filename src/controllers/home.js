const trends = require('./trends');
require('env2')('./config.env');


exports.get = (req, res) => {
trends.get((error, response) => {
  res.render('home', {
    activePage: {
      home: true,
    },
    apiKey: process.env.MAPS_API_KEY,
    trendObj: response
  })
  // console.log(response.trends);
});


};
