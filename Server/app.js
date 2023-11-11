const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

const sequelize = require("./util/database");
const { Op } = require("sequelize");

const allRoutes = require("./routes/index");

const User = require("./models/user");
const ResetPassword = require("./models/resetPassword");
const FriendRequest = require("./models/friendRequest");
const Conversation = require("./models/conversation");
const Message = require("./models/message");
const Participant = require("./models/participant");
const Group = require("./models/group");
const GroupMessage = require("./models/groupMessage");
const GroupMember = require("./models/groupMember");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //if error make it to true

app.use(allRoutes);



//assoications
User.hasMany(ResetPassword);
ResetPassword.belongsTo(User)

User.hasMany(FriendRequest,{
  foreignKey: 'recipient',
  as: 'recipientRequests'
})
FriendRequest.belongsTo(User,{
  foreignKey: 'recipient',
  as: 'recipientUsers'
})
User.hasMany(FriendRequest,{
  foreignKey: 'sender',
  as: 'senderRequests'
})
FriendRequest.belongsTo(User,{
  foreignKey: 'sender',
  as: 'senderUsers'
})

User.belongsToMany(Group, { through: GroupMember });
GroupMember.belongsTo(User, { foreignKey: 'userId' });
Group.belongsToMany(User, { through: GroupMember });

Group.hasMany(GroupMessage);
GroupMessage.belongsTo(Group);

User.hasMany(GroupMessage, { foreignKey: 'senderId' });
GroupMessage.belongsTo(User, { foreignKey: 'senderId' });

// User.belongsToMany(Conversation, { through: Participant, foreignKey: 'userIds' });
Conversation.belongsToMany(User, { through: Participant, foreignKey: 'conversationId' });
Conversation.hasMany(Message);
Message.belongsTo(Conversation);
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });     


//for socket
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


//for socket
io.on("connection", async (socket) => {
  const user_id = socket.handshake.query.user_id
  const socket_id = socket.id

  console.log(`????????????????????user connected is ${user_id} and ${socket_id}`);

  if(user_id){
    const user = await User.update({socket_id: socket_id, status: "Online"},{
      where: {
        id: user_id
      }
    }) 
  }

 //socket event listeners
  socket.on("friend_request", async (data) => {
    console.log(data);

    const to_user = await User.findByPk(data.to,{
      attributes: ["socket_id"]
    })

    const from_user = await User.findByPk(data.from,{
      attributes: ["socket_id"]
    })

    await FriendRequest.create({sender: data.from, recipient: data.to})

    //todo: create a friend request notification

    // emit event "new_friend_request"
    io.to(to_user.socket_id).emit("new_friend_request",{
      message: "New friend request received !"
    })

    // //emit event "request sent"
    io.to(from_user.socket_id).emit("request_sent",{
      message: "Friend request sent !"
    })
  })

  socket.on("accept_request", async (data) => {
    console.log(data);

    //fetching request doc id from data
    const request_doc = await FriendRequest.findOne({
      where: {id: data.request_id}
    })

    const senderId = request_doc.sender // should include user model here
    const receiverId = request_doc.recipient

    await User.update({
      friends: sequelize.literal(`JSON_ARRAY_APPEND(COALESCE(friends, '[]'), '$', ${receiverId})`)
    },{
      where: {
        id: senderId
      }
    })

    await User.update({
      friends: sequelize.literal(`JSON_ARRAY_APPEND(COALESCE(friends, '[]'), '$', ${senderId})`)
    },{
      where: {
        id: receiverId
      }
    })

    //push to friends array or update the friends json by adding the id, the below 2 line is wrong you need to get the user den  update the column
    //delete the request id from friend requests
    await FriendRequest.destroy({
      where: {id: data.request_id}
    })

    const sender = await User.findOne({
      attributes: ["socket_id"],
      where: {id: senderId}
    })

    const receiver = await User.findOne({
      attributes: ["socket_id"],
      where: {id: receiverId}
    })

    io.to(sender.socket_id).emit("request_accepted",{
      message: "Friend Request Accepted"
    })
    io.to(receiver.socket_id).emit("request_accepted",{
      message: "Friend Request Accepted"
    })
  })

  //fire when any user logs in to get the history of his conversation
  socket.on("get_direct_conversations", async ({user_id}, callback)=>{
    console.log("get all friends list of this useriD",user_id);

    const all_friends = await User.findByPk(user_id,{
      attributes: ["friends"]
    })

    const receiverIds = all_friends.friends;
    console.log(receiverIds);
    const friendsDetails = await sequelize.query(`
      SELECT m.*, 
      u.id as senderId, u.firstName as senderFirstName, u.lastName as senderLastName, u.status as senderStatus,
      r.id as receiverId, r.firstName as receiverFirstName, r.lastName as receiverLastName, r.status as receiverStatus
      FROM \`Messages\` m
      INNER JOIN \`Users\` u ON m.\`senderId\` = u.\`id\`
      LEFT JOIN \`Users\` r ON m.\`receiverId\` = r.\`id\`
      WHERE m.\`receiverId\` IN (:receiverIds)
      AND m.\`senderId\` = :senderId
      AND (m.\`receiverId\`, m.\`createdAt\`) IN (
      SELECT m2.\`receiverId\`, MAX(m2.\`createdAt\`) as maxCreatedAt
      FROM \`Messages\` m2
      WHERE m2.\`receiverId\` IN (:receiverIds)
      AND m2.\`senderId\` = :senderId
      GROUP BY m2.\`receiverId\`
      )
    `, {
      replacements: { receiverIds, senderId: user_id }, 
      type: sequelize.QueryTypes.SELECT, 
    });

    // console.log("this is friends deatails",friendsDetails);
    //get all conversation of user of uder_id
    //inside participents in onetoonemessages table get all the things where participents is user_id and even the names of all participenst where the user_id is linked
    // get user firstname last name id email status

    callback(friendsDetails)
  })

  socket.on("start_conversation", async (data)=>{
    const {to, from} = data
    // console.log("start_conversation",data);
    //get the existing conversation between two users

    const userIdsArray = [to, from]
    const existing_conversation = await Participant.findOne({
      where: {
        [Op.and]: userIdsArray.map(userId => {
          return sequelize.where(
            sequelize.literal(`JSON_CONTAINS(userIds, '${userId}')`),
            true
          );
        }),
      }
    })

    const toUserDetails = await User.findByPk(to,{
      attributes:["id", "firstName", "lastName", "status", "phonenumber", "avatar"]
    })

    // console.log(existing_conversation);

    //if no existing conversation
    if(existing_conversation === null){
      //create a new conversation id

      const conversation = await Conversation.create()
      // console.log("xsfsadas",conversation.id);

      const adding_conversationId = await Participant.create({
        conversationId: conversation.id,
        userIds: [to, from]
      })

      const data = {
        adding_conversationId: adding_conversationId,
        toUserDetails: toUserDetails
      }
      // console.log("asdasd",data);
      socket.emit("start_chat", data)
    }

  //   //if exisiting conversation
    else{
      const data = {
        adding_conversationId: existing_conversation,
        toUserDetails: toUserDetails
      }
      // console.log("asdasd",data);
      socket.emit("start_chat", data)
    }
  })

  //handle text message event
  socket.on("text_message", async (data) => {
    // console.log("text_message",data);

    const { message, conversationId, from, to } = data

    const msg = await Message.create({
      text: message,
      conversationId: conversationId,
      senderId: from,
      receiverId: to,
    })

    const to_user = await User.findByPk(to, {
      attributes: ["socket_id"]
    })
    const from_user = await User.findByPk(from, {
      attributes: ["socket_id"]
    })
    console.log("TOUSER", to_user.socket_id, "fromuser", from_user.socket_id);
    // emit incoming message - to user

    io.to(to_user.socket_id).emit("new_message",{
      conversationId: conversationId,
      snack: "New Message",
      message: msg,
    })
    io.to(from_user.socket_id).emit("new_message",{
      conversationId: conversationId,
      snack: "Message Sent",
      message: msg,
    })

  })

  socket.on("create_group", async(data)=>{
    // console.log(data);

    const createdGroup = await Group.create({
      name: data.groupName
    })
    
    socket.join(createdGroup.id)
    const selectedMembers = data.selectedMembers.map((member)=>{
      return {
        groupId: createdGroup.id,
        userId: member.id
      }
    })
    selectedMembers.push({
      isAdmin: true,
      groupId: createdGroup.id,
      userId: parseInt(user_id)
    })

    const addedMembers = await GroupMember.bulkCreate(selectedMembers)
    // console.log(addedMembers);

    const groupMembers = await GroupMember.findAll({
      where: {
        groupId: createdGroup.id
      },
      include: [
        {
          model: User,
          attributes: ["socket_id"]
        }
      ]
    })
    const list = groupMembers.map((grp)=>{
      return{
        id: grp.userId,
        socket: grp.user.socket_id
      }
    });
    // console.log(list);
    list.forEach((li)=>{
      if(li.id === parseInt(user_id)){
        io.to(li.socket).emit("group_created",{
          message: `${data.groupName} group created!`
        })
      }
      else{
        io.to(li.socket).emit("added_to_group",{
          message: `You were added to ${data.groupName} group!`
        })
      }
    })
  })

  socket.on("get_group_list", async ({user_id}, callback)=>{
    const userId = parseInt(user_id)

    const groupNames = await Group.findAll({

      include: [
        {
          model: User,
          where: { id: userId},
          through: {model: GroupMember, attributes: []} 
        }
      ],
      attributes: ["id","name"]
    })

    // console.log(groupNames[0].dataValues);
    const gropInfo = groupNames.map((group) => ({ id: group.id, groupName: group.name }));
    callback(gropInfo)
  })

  socket.on("get_group_messages", async ({id}, callback)=>{
    console.log("get_group_messages",id);
    
    const grpMessages = await GroupMessage.findAll({
      where: {
        groupId: id
      },
      include: [
        { 
          model: User,
          attributes: ["id","firstName", "lastName"]
        }
      ]
    })
    // console.log(grpMessages);
    callback(grpMessages)
  })

  socket.on("grp_message", async(data)=>{
    // console.log(data);
    const grpMessage = await GroupMessage.create({
      text: data.message,
      groupId: data.groupId,
      senderId: data.from
    })
    socket.join(data.groupId)
    // console.log(`User ${socket.id} sent a message to group ${data.groupId}`);
    io.to(data.groupId).emit("message_from_group",{
      msg: "message_from_group"
    })
  })

  socket.on("end",  async (data) => {
    if(data.user_id){
      const user = await User.update({status: "Offline"},{
        where: {
          id: user_id
        }
      })

      //Todo : boradcast user disconnected to his friends

      console.log("closing connection");
      socket.disconnect(0)
    }
  });
})

sequelize
  // .sync({ force: true })
  .sync();

server.listen(port || 5000, () => {
  console.log(`Pingsphere server running on port ${port}`);
});







// const morgan = require('morgan')
// const helmet = require('helmet')
// const rateLimit = require('express-rate-limit')

// if(process.env.NODE_ENV === "development"){
//     app.use(moragn("dev"))
// }

// app.use(helmet({
//     contentSecurityPolicy: false,
//   })
// );

// const limiter = rateLimit({
//     max: 3000,
//     windowMs: 60*60*1000,
//     message: "Too many request from this IP, pease try after an hour!"
// })

// app("/", limiter);
