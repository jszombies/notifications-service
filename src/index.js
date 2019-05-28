const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const notificationsRoute = require('./routes/notifications');
const applyFixtures = require('./fixtures');
const { APP_PORT } = require('./config');

const app = express();

// Middleware
app.use(cors({
  preflightContinue: true,
  optionsSuccessStatus: 200,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1/notifications', notificationsRoute);

mongoose.connect(process.env.MONGO_URL)
  .then(applyFixtures)
  .then(() => {
    app.listen(APP_PORT, () => {
      console.info(`App listening on port ${APP_PORT}!`);
    });
  });

module.exports = app;
