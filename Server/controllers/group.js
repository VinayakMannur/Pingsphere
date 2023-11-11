const User = require("../models/user");


exports.getFriends = async (req, res, next) =>{
    try {
        const {userId} = req.user

        const friendsList = await User.findByPk(userId,{
            attributes: ["friends"]
        })
        console.log(friendsList.friends);

        

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}