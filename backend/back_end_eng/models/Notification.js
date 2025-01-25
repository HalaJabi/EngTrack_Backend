const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Import Schema from mongoose

const notificationSchema = new Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    adminName: { type: String, required: true },
    userName: { type: String, required: true },
    adminImage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
