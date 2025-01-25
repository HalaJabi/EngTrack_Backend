/*const Task = require('../models/Task');

module.exports = {

    createTask: async (req, res) => {
        const { jobid, ...taskDetails } = req.body; // Destructure jobid from request body

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' }); // Validate jobid presence
        }

        const newTask = new Task({ jobid, ...taskDetails });

        try {
            const savedTask = await newTask.save();
            const { __v, updatedAt, ...newTaskInfo } = savedTask._doc;
            res.status(200).json(newTaskInfo);
        } 
        catch (error) {
            res.status(500).json(error);
        }
    },

    getTask: async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllTasks: async (req, res) => {
        const { jobid } = req.query;
        try {
            const tasks = await Task.find({ jobid });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },










    countTasksByJob: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const taskCount = await Task.countDocuments({ jobid });
            res.status(200).json({ jobid, taskCount });
        } catch (error) {
            res.status(500).json(error);
        }
    },


    addMemberToTask: async (req, res) => {
        const { taskId } = req.params;
        const { memberId } = req.body;

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            const user = await User.findById(memberId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // إضافة عضو إلى مصفوفة الأعضاء في المهمة
            if (!task.members.includes(memberId)) {
                task.members.push(memberId);
                await task.save();
                res.status(200).json({ message: 'Member added to task successfully', task });
            } else {
                res.status(400).json({ message: 'Member already exists in this task' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },



    getToDoTasksByJobId: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const tasks = await Task.find({ jobid, toDo: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },



    getinProgressTasksByJobId: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const tasks = await Task.find({ jobid, inProgress: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },



    getunderReviewTasksByJobId: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const tasks = await Task.find({ jobid, underReview: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },



    getdoneTasksByJobId: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const tasks = await Task.find({ jobid, done: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },




    setTaskToDo: async (req, res) => {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update the task status to TODO
            task.toDo = true;
            task.inProgress = false;
            task.underReview = false;
            task.done = false;

            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    },


    setTaskInProgress: async (req, res) => {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update the task status to InProgress
            task.toDo = false;
            task.inProgress = true;
            task.underReview = false;
            task.done = false;

            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    setTaskUnderReview: async (req, res) => {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update the task status to UnderReview
            task.toDo = false;
            task.inProgress = false;
            task.underReview = true;
            task.done = false;

            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    setTaskDone: async (req, res) => {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update the task status to Done
            task.toDo = false;
            task.inProgress = false;
            task.underReview = false;
            task.done = true;

            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    },















    
    

};
*/


const Task = require('../models/Task');

module.exports = {

    createTask: async (req, res) => {
        const { jobid, ...taskDetails } = req.body; // Destructure jobid from request body

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' }); // Validate jobid presence
        }

        const newTask = new Task({ jobid, ...taskDetails });

        try {
            const savedTask = await newTask.save();
            const { __v, updatedAt, ...newTaskInfo } = savedTask._doc;
            res.status(200).json(newTaskInfo);
        } 
        catch (error) {
            res.status(500).json(error);
        }
    },

    getTask: async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllTasks: async (req, res) => {
        const { jobid } = req.query;
        try {
            const tasks = await Task.find({ jobid });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },


    getAllTasksByMemberId: async (req, res) => {///////
        const { memberId } = req.query;
        try {
            const tasks = await Task.find({ members: memberId });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    








    /*

addMembertotask: async (req, res) => {
  
        const taskId = req.params.id;
        const memberName = req.body.memberName;

        if (!memberName) {
            return res.status(400).json({ message: "Member Name is required" });
        }

        const task = await task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }

        if (!task.members.includes(memberName)) {
            task.members.push(memberName);
            await task.save();
            return res.status(200).json({ message: "Member added successfully", task });
        } else {
            return res.status(400).json({ message: "Member already exists in this task" });
        }
  
},*/

addMemberToTask: async (req, res) => {
    const taskId = req.params.id;
    const { memberName } = req.body;

    if (!memberName) {
        return res.status(400).json({ message: "Member Name is required" });
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.members.includes(memberName)) {
            task.members.push(memberName);
            await task.save();
            return res.status(200).json({ message: "Member added successfully", task });
        } else {
            return res.status(400).json({ message: "Member already exists in this task" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
},







    countTasksByJob: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const taskCount = await Task.countDocuments({ jobid });
            res.status(200).json({ jobid, taskCount });
        } catch (error) {
            res.status(500).json(error);
        }
    },



    getToDoTasksByJobId: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const tasks = await Task.find({ jobid, toDo: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },



    getinProgressTasksByJobId: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const tasks = await Task.find({ jobid, inProgress: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },



    getunderReviewTasksByJobId: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const tasks = await Task.find({ jobid, underReview: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },



    getdoneTasksByJobId: async (req, res) => {
        const { jobid } = req.params;

        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }

        try {
            const tasks = await Task.find({ jobid, done: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },




    setTaskToDo: async (req, res) => {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update the task status to TODO
            task.toDo = true;
            task.inProgress = false;
            task.underReview = false;
            task.done = false;

            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    },


    setTaskInProgress: async (req, res) => {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update the task status to InProgress
            task.toDo = false;
            task.inProgress = true;
            task.underReview = false;
            task.done = false;

            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    setTaskUnderReview: async (req, res) => {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update the task status to UnderReview
            task.toDo = false;
            task.inProgress = false;
            task.underReview = true;
            task.done = false;

            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    setTaskDone: async (req, res) => {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update the task status to Done
            task.toDo = false;
            task.inProgress = false;
            task.underReview = false;
            task.done = true;

            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    },





    getToDoTasksByMemberId: async (req, res) => {
        const { memberId } = req.params;

        if (!memberId) {
            return res.status(400).json({ message: 'memberId is required' });
        }

        try {
            const tasks = await Task.find({ members: memberId, toDo: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getInProgressTasksByMemberId: async (req, res) => {
        const { memberId } = req.params;

        if (!memberId) {
            return res.status(400).json({ message: 'memberId is required' });
        }

        try {
            const tasks = await Task.find({ members: memberId, inProgress: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getUnderReviewTasksByMemberId: async (req, res) => {
        const { memberId } = req.params;

        if (!memberId) {
            return res.status(400).json({ message: 'memberId is required' });
        }

        try {
            const tasks = await Task.find({ members: memberId, underReview: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getDoneTasksByMemberId: async (req, res) => {
        const { memberId } = req.params;

        if (!memberId) {
            return res.status(400).json({ message: 'memberId is required' });
        }

        try {
            const tasks = await Task.find({ members: memberId, done: true });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json(error);
        }
    },













    countDoneTasksByJob: async (req, res) => {
        const { jobid } = req.params;
    
        if (!jobid) {
            return res.status(400).json({ message: 'jobid is required' });
        }
    
        try {
            const taskCount = await Task.countDocuments({ jobid, done: true });
            res.status(200).json({ jobid, doneTaskCount: taskCount });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    
    

};