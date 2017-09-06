const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const home = require('./home');
const error = require('./error');

router.get('/', home.get);
router.use(error.client);
router.use(error.server);

module.exports = router;
