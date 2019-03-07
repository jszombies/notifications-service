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

function getNotifications(category, isRead, page, perPage) {
  const query = {};
  if (category !== undefined) query.category = category;
  if (isRead !== undefined) query.isRead = isRead;

  const fields = null;
  const pagination = { skip: page * perPage, limit: perPage };
  return Notification.find(query, fields, pagination);
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

module.exports = { getNotifications, markNotificationsAsRead, markNotificationAsRead };
