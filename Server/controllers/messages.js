const Message = require("../models/message");

exports.getMessages = async(req, res, next)=>{
    try {
   
        const { conversationId } = req.query

        const messages = await Message.findAll({
            where: {
                conversationId: conversationId,
            }
        })

        return res.status(200).json({status: "success", data: messages, msg: "got messages"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}