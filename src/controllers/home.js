require('env2')('./config.env');

exports.get = (req, res) => {
  res.render('home', {
    activePage: {
      home: true,
    },
    apiKey: process.env.MAPS_API_KEY,
  });
};
