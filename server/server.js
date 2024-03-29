/** App use this express framework */
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const ENV = require('dotenv');
ENV.config();

/** Cors */
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

/** Body-Parser Use */
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/** Router */
const tweetsrouter = require('./route/tweets.route.js');

/** Use Router */
app.use('/', tweetsrouter);

/** Server Run 4000 Port Number */
app.listen(process.env.PORT_NUMBER);

module.exports = app;