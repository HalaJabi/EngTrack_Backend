const Notification = require('../models/Notification');

// Controller function to create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { adminId, userId, adminName, userName, adminImage } = req.body;

        // Create a new notification instance
        const newNotification = new Notification({
            adminId,
            userId,
            adminName,
            userName,
            adminImage
        });

        // Save the notification to the database
        const savedNotification = await newNotification.save();

        res.status(201).json(savedNotification); // Respond with the created notification
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller function to get notifications by userId
exports.getNotificationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find notifications by userId
        const notifications = await Notification.find({ userId });

        if (!notifications) {
            return res.status(404).json({ message: "Notifications not found" });
        }

        res.status(200).json(notifications); // Respond with the found notifications
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
};
