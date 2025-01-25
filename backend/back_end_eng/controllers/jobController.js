const Job = require("../models/Job");

module.exports = {
   

    createJob: async (req, res) => {
        const newJob = new Job(req.body);

        try {
            const savedJob = await newJob.save();
            const { __v, updatedAt, ...newJobInfo } = savedJob._doc;
            res.status(200).json(newJobInfo)

            
        } catch (error) {
            res.status(500).json(error)
        }
    },
    


    updateJob: async (req, res) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            }, { new: true });

            const { __v, updatedAt, ...updatedJobInfo } = updatedJob._doc;

            res.status(200).json({updatedJobInfo});
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteJob: async (req, res) => {
        try {
            const jobId = req.params.id; // استخراج معرف الوظيفة من العنوان URL
            await Job.findByIdAndDelete(jobId); // استخدام معرف الوظيفة لحذف الوظيفة المناسبة
            res.status(200).json("Job Successfully Deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    

    getJob: async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);
           
    //   const { __v, createdAt, ...jobData } = job._doc;
            res.status(200).json(job)
        } catch (error) {
            res.status(500).json(error)
        }
    },


    getAllJobs: async (req, res) => {
        const recent = req.query.new;
        try {
           const job= await Job.find()
            /*let jobs;
            if (recent) {
                jobs = await Job.find().sort({ createdAt: -1 }).limit(2)
            } else {
                jobs = await Job.find()
            }*/
            res.status(200).json(job)
        } catch (error) {
            res.status(500).json(error)
        }
    },

 
    searchJobs: async (req, res) => {
        try {
            console.log(req.params.key); // تصحيح هنا
            const results = await Job.find({
                $or: [
                    { title: { $regex: req.params.key, $options: 'i' } }
                ]
            });
            res.status(200).send(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },
    
    


    searchJobBackend: async (req, res) => {
        try {
            const results = await Job.find({ title: "Backend" });
            res.status(200).send(results);
           // res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },
    searchJobFrontend: async (req, res) => {
        try {
            const results = await Job.find({ title: "Frontend" });
            res.status(200).send(results);
           // res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },
    searchJobmobile: async (req, res) => {
        try {
            const results = await Job.find({ title: "mobile" });
            res.status(200).send(results);
           // res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },
    searchJobAi: async (req, res) => {
        try {
            const results = await Job.find({ title: "AI Innovations" });
            res.status(200).send(results);
           // res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },

    /*searchJobBackend: async (req, res) => {
        try {
            const results = await Job.find({ title: "Backend" });
            res.status(200).send(results);
           // res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },
    searchJobFrontend: async (req, res) => {
        try {
            const results = await Job.find({ title: "Frontend" });
            res.status(200).send(results);
           // res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },
    searchJobmobile: async (req, res) => {
        try {
            const results = await Job.find({ title: "mobile" });
            res.status(200).send(results);
           // res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },
    searchJobAi: async (req, res) => {
        try {
            const results = await Job.find({ title: "Ai" });
            res.status(200).send(results);
           // res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err);
            console.log(err); 
        }
    },
*/


    getmyjob: async (req, res) => {
        try {
          const job = await Job.find({ adminId: req.params.id })
          res.status(200).json(job);
        } catch (error) {
          res.status(500).json(error);
        }
},


getAllJobsByAdminId: async (req, res) => { 
    try { const { adminId } = req.params; 
    const jobs = await Job.find({ adminId: adminId }); 
    res.status(200).json(jobs); } 
catch (error) { res.status(500).json(error); } },




addMember: async (req, res) => {
    try {
        const jobId = req.params.id;
        const memberId = req.body.memberId;

        if (!memberId) {
            return res.status(400).json({ message: "Member ID is required" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (!job.members.includes(memberId)) {
            job.members.push(memberId);
            await job.save();
            return res.status(200).json({ message: "Member added successfully", job });
        } else {
            return res.status(400).json({ message: "Member already exists in this job" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
},

addTask: async (req, res) => {
    try {
        const jobId = req.params.id;
        const  taskId = req.body.taskId;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (!job.task.includes(taskId)) {
            job.task.push(taskId);
            await job.save();
            return res.status(200).json({ message: "Member added successfully", job });
        } else {
            return res.status(400).json({ message: "Member already exists in this job" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
},



getMembersByJobId: async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job.members);
    } catch (error) {
        res.status(500).json(error);
    }
},






getAllJobsByMemberId: async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const jobs = await Job.find({ members: memberId });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json(error);
    }
},






}