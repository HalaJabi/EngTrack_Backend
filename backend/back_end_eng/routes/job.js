const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");



// CREATE JOB
router.post("/", verifyTokenAndAdmin, jobController.createJob);
// UPADATE JOB
router.put("/:id", verifyTokenAndAdmin, jobController.updateJob);
// DELETE JOB
router.delete("/:id", verifyTokenAndAdmin, jobController.deleteJob);
// GET JOB BY ID
router.get("/:id", jobController.getJob);
// GET ALL JOBS
router.get("/", jobController.getAllJobs);
router.get("/admin/:adminId", jobController.getAllJobsByAdminId);
// SEARCH FOR JOBS
router.get("/search/:key", jobController.searchJobs);
router.get("/searc/Backend", jobController.searchJobBackend);
router.get("/searc/Frontend", jobController.searchJobFrontend);
router.get("/searc/Ai", jobController.searchJobAi);
router.get("/searc/mobile", jobController.searchJobmobile);
router.put("/:id/addMember", jobController.addMember);
router.put("/:id/addTask", jobController.addTask);
router.get("/members/:id", jobController.getMembersByJobId);
router.get("/member/:memberId", jobController.getAllJobsByMemberId);
//router.get("/search/:filterBy/:key", jobController.searchJobs);
module.exports = router