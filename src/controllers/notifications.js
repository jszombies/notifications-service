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

const asyncController = route => (req, res) => {
  Promise.resolve(route(req, res)).catch(console.error);
};

async function getNotifications(req, res) {
  const { category, isRead } = req.body;
  const { page: originalPage, perPage: originalPerPage } = req.query;
  const page = +(originalPage || 0);
  const perPage = +(originalPerPage || 0);

  const notificationsCount = (await Notifications.getNotifications()).length;

  if (page < 1) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .send({ error: '\'page\' should be greater than 0' });
    return;
  }

  // (page - 1) - this statement is here because mongodb's pagination starts from 0
  const notifications = await Notifications.getNotifications(category, isRead, page - 1, perPage);

  res
    .status(HTTP_STATUS_CODES.OK)
    .send({
      notifications: notifications.map(transformNotification),
      pagination: {
        notificationsCount,
        total: Math.ceil(notificationsCount / perPage),
        page,
        perPage,
        hasNext: notificationsCount > page * perPage,
      },
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

module.exports = {
  getNotifications: asyncController(getNotifications),
  markNotificationsAsRead,
  markNotificationAsRead,
};
