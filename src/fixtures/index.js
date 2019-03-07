const mongoose = require('mongoose');
const { createNotification } = require('../models/notification');
const { categories, priorities, texts } = require('./constants');

function getRandom(min, max) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

function generateNotification() {
  const category = categories[getRandom(0, categories.length - 1)];
  const priority = priorities[getRandom(0, priorities.length - 1)];
  const text = texts[getRandom(0, texts.length - 1)];

  return { category, priority, text };
}

function generateReadNotification() {
  const unreadNotification = generateNotification();
  return { ...unreadNotification, isRead: true, readOn: new Date() };
}

function generateNotifications(count) {
  const notificationsBuffer = [generateNotification()];

  for (let i = 0; i < count - 1; i += 1) {
    if (Math.random() > 0.5) {
      notificationsBuffer.push(generateReadNotification());
    } else {
      notificationsBuffer.push(generateNotification());
    }
  }

  return notificationsBuffer;
}

function createNotifications(count = 10) {
  return Promise.all(generateNotifications(count).map(createNotification));
}

function applyFixtures() {
  if (process.env.APPLY_FIXTURES === 'true') {
    return Promise.all([
      mongoose.connection.dropDatabase(),
      createNotifications(process.env.FIXTURES_COUNT),
    ]);
  }
  // do nothing
  return new Promise(resolve => resolve());
}

module.exports = applyFixtures;
