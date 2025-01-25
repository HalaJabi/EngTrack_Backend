const { bool } = require("joi");
const mongoose = require("mongoose");

const RequestFormSchema = new mongoose.Schema(
    {

       JobId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        agentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
       
        Score: { type: String, required: true, default:88},
    


        reject:
        {
            type: Boolean,
            default: false
        
        },
        Accepted:
        {
            type: Boolean,
            default: false
        },

        CV: 
        {
            type: String,
            require: false,
            default:"cv",
         
        },


        similarity:
        {
            type: String,
            require: false,
            default:"similarity",
         
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("RequestForm", RequestFormSchema)