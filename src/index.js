const express = require('express');
const bodyParser = require('body-parser');
// const DAO = require('./dao');
const notificationsRoute = require('./routes/notifications');
const {
  APP_PORT,
  // DB_ADDRESS,
  // DB_PORT,
  // DB_NAME,
} = require('./config');

const app = express();
// const dao = new DAO({ host: DB_ADDRESS, port: DB_PORT, name: DB_NAME });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1/notifications', notificationsRoute);

// Start app
// dao.connect()
//   .then(() => {
app.listen(APP_PORT, () => {
  console.info(`App listening on port ${APP_PORT}!`);
});
//   });

module.exports = app;
