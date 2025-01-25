const router = require("express").Router();
const projectContoller = require("../controllers/projectContoller");
const {verifyTokenAndUser,verifyToken} = require("../middleware/verifyToken");



// CREATE JOB
router.post("/", verifyToken, projectContoller.createProject);

// GET Project BY ID
router.get("/:id", projectContoller.getProject);

// GET ALL Projects
router.get("/", projectContoller.getAllProject);

/*
// UPADATE JOB
router.put("/:id", verifyTokenAndUser, projectContoller.updateJob);

//DELETE JOB
router.delete("/:id", verifyTokenAndUser, projectContoller.deleteJob);

// GET JOB BY ID
router.get("/:id", projectContoller.getJob);

// GET ALL JOBS
router.get("/", projectContoller.getAllJobs);


// SEARCH FOR JOBS
router.get("/search/:key", projectContoller.searchJobs);  
*/
module.exports = router