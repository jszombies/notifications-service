const Notifications = require('../models/notification');
const { HTTP_STATUS_CODES } = require('./constants');

function transformNotification({ _doc: notification }) {
  return {
    ...notification,
    ID: notification._id,
    _id: undefined,
    __v: undefined,
  };
}

function getNotifications(req, res) {
  const { category, isRead } = req.body;
  const { page, perPage } = req.query;

  Notifications.getNotifications(category, isRead, +page, +perPage)
    .then((result) => {
      res
        .status(HTTP_STATUS_CODES.OK)
        .send({ notifications: result.map(transformNotification) });
    })
    .catch((error) => {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ error });
    });
}

function markNotificationsAsRead(req, res) {
  Notifications.markNotificationsAsRead()
    .then(() => {
      res
        .status(HTTP_STATUS_CODES.OK)
        .end();
    })
    .catch((error) => {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ error });
    });
}

function markNotificationAsRead(req, res) {
  Notifications.markNotificationAsRead(req.params.id)
    .then(() => {
      res
        .status(HTTP_STATUS_CODES.OK)
        .end();
    })
    .catch((error) => {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ error });
    });
}

module.exports = { getNotifications, markNotificationsAsRead, markNotificationAsRead };
