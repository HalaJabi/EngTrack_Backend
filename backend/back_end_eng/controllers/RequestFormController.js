const RequestForm = require('../models/RequestForm'); 


module.exports = {
  
   createForm: async (req, res) => 
    {
       const newRequestForm = new RequestForm(req.body);
       try {
           const savedForm = await newRequestForm.save();
           const { __v, updatedAt, ...newRequestFormInfo } = savedForm._doc;
           res.status(200).json(newRequestFormInfo)
       } catch (error) {
           res.status(500).json(error)
      }
      },
      
      getForm: async (req, res) => {
        try {
            const Form  = await RequestForm.findById(req.params.id);
            res.status(200).json(Form)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },


   /* getAllForms: async (req, res) => {
        //const Form = req.query.new;
        try {
           const Form= await RequestForm.find()
            res.status(200).json(Form)
        } catch (error) {
            res.status(500).json(error)
        }
    },*/




    getAllForms: async (req, res) => {
        const adminId = req.query.adminId;
        try {
            const forms = await RequestForm.find({ adminId: adminId });
            res.status(200).json(forms);
        } catch (error) {
            res.status(500).json(error);
        }
    },


    deleteForm: async (req, res) => {
        try {
            const form = await RequestForm.findById(req.params.id);
            if (!form) {
                return res.status(404).json("Form not found");
            }
            await RequestForm.findByIdAndDelete(req.params.id);
            res.status(200).json("Form has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    

   }