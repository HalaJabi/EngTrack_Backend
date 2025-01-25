const jwt = require("jsonwebtoken");
const User = require("../models/User");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if (err){
                return res.status(403).json({status: false, message: "Token is not valid!"});
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({status: false, message: "You do not have permission to access this route"});
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id || req.user.isAdmin) {
            next();
        } else {
           return res.status(403).json({status: false, message: "You do not have permission to access this route"});
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({status: false, message: "You do not have permission to access this route"});
        }
    });
};


const verifyTokenAndAgent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAgent || req.user.isAdmin) {
            next();
        } else {
           return res.status(403).json({status: false, message: "You do not have permission to access this route"});
        }
    });
};

const verifyTokenAndUser = (req, res, next) => {
    //console.log("hi");
    verifyToken(req, res, () => {
       
        if (req.user.isGeneral) 
        {
            
            next();
        } 
        else 
        {
            console.log(req.user.isGeneral);
            return res.status(403).json({status: false, message: "You do do not have permission to access this route"});
        }
    });
};


const verifyUserCredentials = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ status: false, message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ status: false, message: "Invalid username or password" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: "Invalid username or password" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};
module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndAgent,verifyTokenAndUser,verifyUserCredentials };
