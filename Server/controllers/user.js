const FriendRequest = require("../models/friendRequest");
const User = require("../models/user");
const filterObj = require("../util/filterObj");
const { Op } = require("sequelize");


exports.updatedMe = async (req, res, next) =>{
    try {

        const filteredBody = filterObj(req.body, "firstName","lastName","about", "avatar")

        const updatedUser = await User.update(filteredBody, {
            where: {id: req.user.userId}
        })

        return res.status(200).json({status: "success", data: updatedUser, msg: "Updated User"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}

exports.getUsers = async (req, res, next) =>{
    try {
        const all_users = await User.findAll({
            attributes: ["id", "firstName", "lastName" ],
            where: {verified: true}
        })

        const this_user = req.user.userId
     
        // //get the friends column of this_user and filter from the all users
        const this_user_friends = await User.findOne({
            attributes: ["friends"],
            where: {id: this_user}
        })

        const remaining_users = all_users.filter((user) => {
                if(this_user_friends.friends === null){
                    return user && user.id !==this_user
                }
                else{
                    return !this_user_friends.friends.includes(user.id) && user.id !==this_user
                }
        })
                
        return res.status(200).json({status: "success", data: remaining_users, msg: "Users sent successfully"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}

exports.getFriends = async (req, res, next) =>{
    try {

        const friends_list = await User.findOne({
            attributes: ["friends"],
            where: {id: req.user.userId}
        })

        if(friends_list.friends){
            const friends = await User.findAll({
                attributes: ["id", "firstName", "lastName" ],
                where: {
                    id:{
                        [Op.in]: friends_list.friends
                    }
                    
                }
            })
    
            return res.status(200).json({status: "success", data: friends, msg: "Friends found successfully !"})
        }
        else{
            return res.status(200).json({status: "success",  msg: "No friends !"})
        }

        

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}

exports.getRequests = async (req, res, next) =>{
    try {    

        const requests = await FriendRequest.findAll({
            where:{
                recipient: req.user.userId
            },
            include: {
                model: User, 
                as : "senderUsers", 
                attributes: ["id", "firstName", "lastName"]
            },
        })
        // res.status(200).json({data: requests[2].senderUsers})

        res.status(200).json({status: "success", data: requests, msg: "Friend requests found successfully !"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}

exports.handleFileUpload = async(req, res, next) =>{
    try {
        const file = req
        console.log("file",file);

        // if (!file) {
        //     return res.status(400).json({ error: 'No file uploaded' });
        //   }

        // const profile = await User.update({avatar: file.buffer},{
        //     where:{
        //         id: req.user.userId
        //     }
        // })
        // console.log("profile",profile);

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}

