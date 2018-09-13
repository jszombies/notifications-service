const Notifications = require('../dao/notifications');
const { HTTP_STATUS_CODES } = require('./constants');

function getNotifications(req, res) {
  const {
    category,
    isRead,
    page,
    perPage,
  } = req.body;

  Notifications.getNotifications(category, isRead, page, perPage)
    .then((result) => {
      res
        .status(HTTP_STATUS_CODES.OK)
        .send({ notifications: result });
    })
    .catch((error) => {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ error });
    });
}

function markNotificationsAsRead(req, res) {
  Notifications.markNotificationsAsRead()
    .then((result) => {
      res
        .status(HTTP_STATUS_CODES.OK)
        .send({ notifications: result });
    })
    .catch((error) => {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ error });
    });
}

function markNotificationAsRead(req, res) {
  Notifications.markNotificationAsRead(req.params.id)
    .then((result) => {
      res
        .status(HTTP_STATUS_CODES.OK)
        .send({ notification: result });
    })
    .catch((error) => {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ error });
    });
}

module.exports = { getNotifications, markNotificationsAsRead, markNotificationAsRead };
