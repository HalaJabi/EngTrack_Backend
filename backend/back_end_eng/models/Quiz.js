const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
    {
       JobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        question:
        {
            type: Array,
            default:false,
        },
        correctcontroller:
        {
            type: Array,
            default:false,
        },
        option1controller:
        {
            type: Array,
            default:false,
        },
        option2controller:
        {
            type: Array,
            default:false,
        },
        option3controller:
        {
            type: Array,
            default:false,
        },
        option4controller:
        {
            type: Array,
            default:false,
        },

       

    }, { timestamps: true }
);
module.exports = mongoose.model("Quiz", QuizSchema)