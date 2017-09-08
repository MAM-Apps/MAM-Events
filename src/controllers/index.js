const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const home = require('./home');
const error = require('./error');
const stream = require('./stream');
const events = require('./events');
// Main route

router.get('/events', events.get);
router.get('/', home.get);
router.post('/stream', stream.post);
router.use(error.client);
router.use(error.server);

module.exports = router;
