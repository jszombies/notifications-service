const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  createdOn: {
    type: Date,
    default: new Date(),
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  readOn: Date,
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['DEBUG', 'INFO', 'ERROR', 'CRIT', 'WARN'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['VERYLOW', 'LOW', 'NORMAL', 'HIGH', 'URGENT'],
    required: true,
  },
  isPrivate: Boolean,
});

const Notification = mongoose.model('Notification', notificationSchema);

function getNotifications(category, isRead, page, perPage, sortBy, sortOrder = 'asc') {
  const query = {};
  if (category !== undefined) query.category = category;
  if (isRead !== undefined) query.isRead = isRead;

  const fields = null;
  const options = {
    skip: page * perPage,
    limit: perPage,
    sort: { [sortBy]: sortOrder.toLowerCase() === 'desc' ? -1 : 1 },
  };
  return Notification.find(query, fields, options);
}

// Is used only for fixtures
function createNotification(notification = {}) {
  return Notification.create(notification);
}

function markNotificationsAsRead() {
  const query = { isRead: false };
  const modification = { $set: { isRead: true, readOn: new Date() } };
  return Notification.updateMany(query, modification);
}

function markNotificationAsRead(id) {
  const query = { _id: id };
  const modification = { $set: { isRead: true, readOn: new Date() } };
  return Notification.updateOne(query, modification);
}

module.exports = {
  getNotifications,
  markNotificationsAsRead,
  markNotificationAsRead,
  createNotification,
};
