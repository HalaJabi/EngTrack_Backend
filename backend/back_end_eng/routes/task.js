const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const TaskContoller = require("../controllers/TaskContoller");




router.post("/", verifyTokenAndAdmin, TaskContoller.createTask);


router.get("/Getbyid/:id",TaskContoller.getTask);


router.get("/", TaskContoller.getAllTasks);

router.get("/member", TaskContoller.getAllTasksByMemberId);////


router.put("/:id/addMember", TaskContoller.addMemberToTask);


router.get("/count/:jobid", TaskContoller.countTasksByJob);
router.get("/done/count/:jobid", TaskContoller.countDoneTasksByJob);


router.get("/todo/:jobid", TaskContoller.getToDoTasksByJobId);

router.get("/inProgress/:jobid", TaskContoller. getinProgressTasksByJobId);
router.get("/underReview/:jobid", TaskContoller. getunderReviewTasksByJobId);
router.get("/done/:jobid", TaskContoller. getdoneTasksByJobId);

router.put("/setTodo/:taskId", TaskContoller.setTaskToDo);
router.put("/setInProgress/:taskId", TaskContoller.setTaskInProgress);
router.put("/setUnderReview/:taskId", TaskContoller.setTaskUnderReview);
router.put("/setDone/:taskId", TaskContoller.setTaskDone);

router.get("/todo/member/:memberId", TaskContoller.getToDoTasksByMemberId);
router.get("/inProgress/member/:memberId", TaskContoller.getInProgressTasksByMemberId);
router.get("/underReview/member/:memberId", TaskContoller.getUnderReviewTasksByMemberId);
router.get("/done/member/:memberId", TaskContoller.getDoneTasksByMemberId);

module.exports = router