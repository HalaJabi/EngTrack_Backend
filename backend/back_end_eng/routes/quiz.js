const router = require("express").Router();
const QuizController = require("../controllers/quizController");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");



// CREATE Quiz
router.post("/",verifyTokenAndAdmin, QuizController.createQuiz);

//router.get("/:id", QuizController.getQuiz);
router.get("/job/:jobId", QuizController.getQuizByJobId);

module.exports = router