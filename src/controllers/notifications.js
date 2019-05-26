const Notifications = require('../models/notification');
const { HTTP_STATUS_CODES, RESPONSE_DATA_LIMIT } = require('../constants');

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
  const {
    page,
    perPage: originalPerPage,
    sortBy,
    sortOrder,
    category,
    isRead,
  } = req.query;

  if (page === undefined) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .send({ error: '\'page\' is required' });
    return;
  }

  if (originalPerPage === undefined) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .send({ error: '\'perPage\' is required' });
    return;
  }

  if (page < 1) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .send({ error: '\'page\' should be greater than 0' });
    return;
  }

  const perPage = Math.min(+originalPerPage || RESPONSE_DATA_LIMIT, RESPONSE_DATA_LIMIT);

  // (page - 1) - this statement is here because mongodb's pagination starts from 0
  const notifications = await Notifications.getNotifications(
    category,
    isRead,
    page - 1,
    perPage,
    sortBy,
    sortOrder,
  );

  const notificationsCount = (await Notifications.getNotifications()).length;

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
