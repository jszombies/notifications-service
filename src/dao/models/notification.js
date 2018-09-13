const mongoose = require('mongoose');

const Notification = new mongoose.Schema({
  ID: String,
  createdOn: String,
  isRead: Boolean,
  readOn: String,
  text: String,
  category: ['DEBUG', 'INFO', 'ERROR', 'CRIT', 'WARN'],
  priority: ['VERYLOW', 'LOW', 'NORMAL', 'HIGH', 'URGENT'],
  isPrivate: Boolean,
});

module.exports = mongoose.model('Notification', Notification);
