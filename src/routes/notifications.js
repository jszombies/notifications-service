const express = require('express');
const controller = require('../controllers/notifications');

const router = express();

router.get('/', controller.getNotifications);
router.put('/', controller.markNotificationsAsRead);
router.put('/:id', controller.markNotificationAsRead);

module.exports = router;
