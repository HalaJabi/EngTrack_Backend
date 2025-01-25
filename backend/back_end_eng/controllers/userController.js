const User = require("../models/User");
const CryptoJS=require("crypto-js");
module.exports = {
    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id, {
                $set: req.body
            }, { new: true });
            const { password, __v, createdAt, ...others } = updatedUser._doc;

            res.status(200).json({ ...others });
            //res.status(200).json(updatedUser);
        } 
        catch (err) {
            res.status(500).json(err)
        }
    },

    

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id)
            res.status(200).json("Account Successfully Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getUser2: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const { password, __v, createdAt, ...userdata } = user._doc;
            res.status(200).json(userdata)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    


 getUser:  async (req, res) => {
    try {
        const user = await User.findById(req.params.id); //     req.params.idاستخدام req.params.id بدلاً من req.user.id
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        const { password, __v, createdAt, ...userdata } = user._doc;
        res.status(200).json({ status: true, data: userdata });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
},






    getAllUsers: async (req, res) => {
        try {
            const allUser = await User.find();

            res.status(200).json(allUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },


    getUserRole: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            const { isAdmin, isAgent } = user;

            let role = "user";
            if (isAdmin) {
                role = "admin";
            } else if (isAgent) {
                role = "agent";
            }

            res.status(200).json({ status: true, role: role });
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    },

    


}

/*const User= require("../models/User");
const CryptoJS=require("crypto-js");


module.exports = {
updateUser:async(req,res) => {
if(req.body.password)
{
    req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();

}

try{

    const UpdateUser = await User.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },  {new:true}
    ); 
   const{ password,__v,createdAt, ...others } = this.updateUser._doc;
   res.status(200).json({...other});
}
catch(error)
{

}
},
} */