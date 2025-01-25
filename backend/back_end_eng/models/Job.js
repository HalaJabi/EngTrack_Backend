const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        location: { type: String, required: true},
        company: { type: String, required: true  },
        description: { type: String, required: true },
        salary: { type: String, required: true },
        period: { type: String, required: true },
        contract: { type: String, required: true },
        imageUrl: {
            type: String,
            require: true
        },
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        requirements: {
            type: String,
            required: true
        },

        members: {
            type: Array,
            required: false
        },

    task: {
        type: Array,
            required: false
        },



    }, { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
