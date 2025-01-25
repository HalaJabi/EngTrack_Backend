const router = require("express").Router();
const RequestFormController = require("../controllers/RequestFormController");
const { verifyToken,verifyTokenAndAgent } = require("../middleware/verifyToken");



// CREATE RequestForm
router.post("/",verifyTokenAndAgent,RequestFormController.createForm);

router.get("/Get/:id",RequestFormController.getForm);

router.get("/GetAll", RequestFormController.getAllForms);
router.delete("/:id", RequestFormController.deleteForm);

module.exports = router