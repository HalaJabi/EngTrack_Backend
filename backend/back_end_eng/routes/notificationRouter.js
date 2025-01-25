const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Route to create a new notification
router.post('/create', notificationController.createNotification);

// Route to get notifications by userId
router.get('/user/:userId', notificationController.getNotificationsByUserId);

module.exports = router;
