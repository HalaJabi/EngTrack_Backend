const router = require("express").Router();
const userController = require("../controllers/userController");
const {verifyUserCredentials, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");

// UPADATE USER
router.put("/", verifyTokenAndAuthorization, userController.updateUser);

// DELETE USER
router.delete("/", verifyTokenAndAuthorization, userController.deleteUser);
// GET USER

router.get("/:id", userController.getUser);



router.get("/",verifyTokenAndAuthorization,  userController.getUser2);


router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

router.get("/:id/role", userController.getUserRole);

module.exports = router