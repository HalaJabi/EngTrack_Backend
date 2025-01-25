const router = require("express").Router();
const messageController = require("../controllers/messagesController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");



// CREATE MESSAGE
router.post("/", verifyTokenAndAuthorization, messageController.sendMessage);


// Get ALL MESSAGES
router.get("/:id", verifyTokenAndAuthorization, messageController.getallMessages);


module.exports = router