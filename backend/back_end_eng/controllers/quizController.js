const Quiz = require('../models/quiz');

module.exports = {
  
   createQuiz: async (req, res) => {
       const newQuiz = new Quiz(req.body);
       try {
           const savedQuiz = await newQuiz.save();
           const { __v, updatedAt, ...newQuizInfo } = savedQuiz._doc;
           res.status(200).json(newQuizInfo)
       } catch (error) {
           res.status(500).json(error)
       }
  },

 /* getQuiz: async (req, res) => {
    try {

        const quiz = await Quiz.findById(req.params.id);
        res.status(200).json(quiz)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
},*/

getQuizByJobId: async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ JobId: req.params.jobId });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(quiz)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
},


};