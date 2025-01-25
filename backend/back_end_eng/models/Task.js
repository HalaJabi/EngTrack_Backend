const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
          {
       jobid: { type: String, required: true },

        title: { type: String, required: true },
        Note: { type: String, required: true },
       
        StartDate: { type: Date, required: true },
        EndDate: { type: Date, required: true},
        EndTime: { type: String, required: true },
       
        members: {
            type: Array,
            required: false
        },
            
            
            toDo: {
                type: Boolean,
                default: true
            },

            inProgress: {
                type: Boolean,
                default: false
            },
            underReview: {
                type: Boolean,
                default: false
            },
            
            done: {
                type: Boolean,
                default: false
            },
            
            

        }, { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema)