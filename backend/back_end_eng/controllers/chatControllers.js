const Chat = require("../models/Chat");
const User = require("../models/User");


module.exports = {
    accessChat: async (req, res) => {
        const { userId } = req.body;

        if (!userId) {
            console.log("UserId param not sent with request");
            return res.status(400);
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "username profile email",
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: req.user.id,
                isGroupChat: false,
                users: [req.user.id, userId],
            };

            try {
                const createdChat = await Chat.create(chatData);
                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                    "users",
                    "-password"
                );
                res.status(200).json(FullChat);
            } catch (error) {
                res.status(400).json("Error Creating Chat");

            }
        }
    },
    
    getChats: async (req, res) => {
        try {
            Chat.find({ 
                $or: [
                    { users: { $elemMatch: { $eq: req.user.id } } }, // المستخدم
                    { groupAdmin: req.user.id } // المسؤول
                ]
            })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "username profile email",
                });
                res.status(200).send(results);
            });
        } catch (error) {
            res.status(500).json("Error Fetching Chat");
        }
    }
    

 /*   getChats: async (req, res) => {
        try {
            Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                    results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "username profile email",
                    });
                    res.status(200).send(results);
                });
        } catch (error) {
            res.status(500).json("Error Fetching Chat");

        }

    }*/
}