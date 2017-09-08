const express = require('express');
const path = require('path');
// const morgan = require("morgan");
// const cors = require("cors");
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');


const controllers = require('./controllers/index');
const helpers = require('./controllers/helpers');
const app = express();
//
// app.set("host", process.env.HOST || "0.0.0.0");
// app.set("port", process.env.PORT0 || 3000);
// app.set("x-powered-by", false);
// app.set("etag", false);

// Instantiate CORS whitelist
// var whitelist = [],
  // enableAll = false;

// Check if FEBL_CORS_WHITELIST exists
// if (process.env.FEBL_CORS_WHITELIST) {
//   if (process.env.FEBL_CORS_WHITELIST.indexOf(",") > -1) {
    // Add custom whitelisted domains
  //   whitelist = whitelist.concat(process.env.FEBL_CORS_WHITELIST.split(","))
  // } else {
    // Just push the FEBL_CORS_WHITELIST value
    // whitelist.push(process.env.FEBL_CORS_WHITELIST);
  // }
  // Log CORS whitelist
  // console.log("Using CORS whitelist of " + whitelist);
  // Otherwise enable all origins
// } else {
//   enableAll = true;
// }

// CORS middleware handler
// var corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.length > 0) {
//       var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
//       callback(null, originIsWhitelisted);
//     } else if (enableAll) {
//       callback(null, true);
//     } else {
//       callback(null, false);
//     }
//   }
// };

// View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers,
  }),
);

//
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);

module.exports = app;
