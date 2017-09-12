require('env2')('./config.env');

exports.get = (req, res) => {
    res.render('new-event', {
        activePage: {
            home: true,
        },
        apiKey: process.env.MAPS_API_KEY,
    });
};
