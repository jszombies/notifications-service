// TODO: remove next line
/*  eslint-disable no-unused-vars */
const Notification = require('./models/notification');

function getNotifications(category, isRead, page, perPage) {
  // TODO: implement it
  // Returns items by page
  return new Promise((resolve, reject) => {
    resolve([{ key1: 'value1' }, { key2: 'value2' }]);
  });
}

function markNotificationsAsRead() {
  // TODO: implement it
  // Returns marked items
  return new Promise((resolve, reject) => {
    resolve([{ key1: 'value1' }, { key2: 'value2' }]);
  });
}

function markNotificationAsRead(id) {
  // TODO: implement it
  // Returns updated item
  return new Promise((resolve, reject) => {
    resolve({ id, key1: 'value1' });
  });
}

module.exports = { getNotifications, markNotificationsAsRead, markNotificationAsRead };
