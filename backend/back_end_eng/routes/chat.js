const router = require("express").Router();
const chatController = require("../controllers/chatControllers");
const { verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");



// CREATE CHAT
router.post("/", verifyTokenAndAuthorization, chatController.accessChat);


// Get Chats
router.get("/", verifyTokenAndAuthorization, chatController.getChats);


module.exports = router