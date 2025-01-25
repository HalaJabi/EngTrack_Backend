const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        username: { type: String, required: true },
        description: { type: String, required: true },
        salary: { type: String, required: true },
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
             },
        requirements:{
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            require: true
        },
        deadline: {
            type: String,
            required: true
        },
    }, { timestamps: true }
);
module.exports = mongoose.model("Project", ProjectSchema)