const Project = require('../models/Project'); 

module.exports = {
    createProject: async (req, res) => {
        const newProject= new Project(req.body);

        try {
            const savedProject = await newProject.save();
            const { __v, updatedAt, ...newProjectInfo } = savedProject._doc;
            res.status(200).json(newProjectInfo)

            
        } 
        catch (error) {
            res.status(500).json(error)
        }
    },

    getProject: async (req, res) => {
        try 
        {
        const project = await Project.findById(req.params.id);
            res.status(200).json(project)
        } 
    catch (error) 
    {
            console.log(error);
            res.status(500).json(error)
        }
    },


    getAllProject: async (req, res) => {
        const recent = req.query.new;
        try {
           const project= await Project.find()
            res.status(200).json(project)
        } 
        catch (error) 
        {
            res.status(500).json(error)
        }
    },

    
}