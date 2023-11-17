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

User.hasMany(Group)
Group.belongsTo(User, {foreignKey: "createdBy"})

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
const { log } = require("console");
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

  // console.log(`????????????????????user connected is ${user_id} and ${socket_id}`);

  if (!user_id) {
    console.log("User ID is required for connection.");
    return;
  }

  if(user_id){
    const user = await User.update({socket_id: socket_id, status: "Online"},{
      where: {
        id: user_id
      }
    }) 
  }

 //socket event listeners
  socket.on("friend_request", async (data) => {
    // console.log(data);
    try {
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
    } catch (error) {
      console.log(error);
    }
    
  })

  socket.on("accept_request", async (data) => {
    // console.log(data);
    try {
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
    } catch (error) {
      console.log(error);
    } 
  })

  //fire when any user logs in to get the history of his conversation
  socket.on("get_direct_conversations", async ({user_id}, callback)=>{
    // console.log("get all friends list of this useriD",user_id);
    try {
      const all_friends = await User.findByPk(user_id,{
        attributes: ["friends"]
      })
  
      if(all_friends && all_friends.friends){
        const receiverIds = all_friends.friends;
        // console.log(receiverIds);
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
      }
      else{
        callback([]);
      }
    } catch (error) {
      console.log(error);
    }   
  })

  socket.on("start_conversation", async (data)=>{
    try {
      if(!data || !data.to || !data.from){
        socket.emit("start_chat_error", { msg: "Both 'to' and 'from' are required in the request." });
        return;
      }
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

      //if exisiting conversation
      else{
        const data = {
          adding_conversationId: existing_conversation,
          toUserDetails: toUserDetails
        }
        // console.log("asdasd",data);
        socket.emit("start_chat", data)
      }
    } catch (error) {
      console.log(error);
    }
  })

  //handle text message event
  socket.on("text_message", async (data) => {
    // console.log("text_message",data);
    try {
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
      // console.log("TOUSER", to_user.socket_id, "fromuser", from_user.socket_id);
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
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("create_group", async(data)=>{
    // console.log(data);
    try {
      const createdGroup = await Group.create({
        name: data.groupName,
        createdBy: data.user_id
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
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("add_to_group", async(data)=>{
    // console.log("add_to_group",data.groupName);
    try {
      socket.join(data.groupId)
      const selectedMembers = data.selectedMembers.map((member)=>{
        return {
          groupId: data.groupId,
          userId: member.id
        }
      })
      const addedMembers = await GroupMember.bulkCreate(selectedMembers)

      const list = data.selectedMembers.map((member)=>member.id)
      // console.log(list);

      const socketIds = await User.findAll({
        where:{
          id: list
        },
        attributes: ["socket_id"]
      })

      socketIds.forEach((li)=>{
        io.to(li.socket_id).emit("added_to_group",{
          message: `You were added to ${data.groupName} group!`
        })
      })
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("get_group_list", async ({user_id}, callback)=>{
    try {
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
      const groupIds = gropInfo.map((grp) => grp.id)

      const latestMessages = await Promise.all(
        groupIds.map(async (groupId) => {
          const latestMessage = await GroupMessage.findOne({
            where: { groupId },
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: User,
                attributes: ['firstName'], // Add more attributes as needed
              },
            ],
          });
  
          if (latestMessage) {
            return {
              groupId,
              latestMessage: {
                text: latestMessage.text,
                createdAt: latestMessage.createdAt,
                sender: {
                  firstName: latestMessage.user.firstName,
                  // Add more sender details as needed
                },
              },
            };
          } else {
            return null; // No messages found for the group
          }
        })
      );
  
      const formattedMessages = latestMessages.filter((message) => message !== null);


      callback({gropInfo, formattedMessages})
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("get_friends_not_paart_of_group", async({groupId, user_id}, callback)=>{
    // console.log("get_friends_not_paart_of_group",groupId);
    try {
      const groupMembers = await GroupMember.findAll({
        where: { 
          groupId,
        },
      });
  
      const adminFriends = await User.findByPk(parseInt(user_id),{
        attributes: ["friends"]
      })
  
      const adminUserFriends = adminFriends.friends || [];
  
      const friendsNotInGroup = adminUserFriends.filter(
        (friendId) =>
          !groupMembers.some((member) => member.userId === friendId)
      );
      // console.log(friendsNotInGroup);
  
      const friendsNGrp = await User.findAll({
        where: {
          id: friendsNotInGroup
        },
        attributes: ["id","firstName", "lastName"]
      })
      // console.log(friendsNGrp);
      callback(friendsNGrp)
    } catch (error) {
      console.log(error);
    }
   
  })

  socket.on("get_group_messages", async ({id}, callback)=>{
    try {
      // console.log("get_group_messages???????????????????????????????/",id);
    
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
      const createdBy = await Group.findOne({
        attributes: ["createdBy"],
        where: {
          id: id,
        }
      })

      // console.log("++++++++++++++++",createdBy, id);
      const userId = createdBy.dataValues.createdBy
      const grpAdmin = await User.findByPk(userId,{
        attributes: ["id", "firstName", "lastName"]
      })

      const grpAdmins = await GroupMember.findAll({
        attributes: ["userId"],
        where:{
          groupId: id,
          isAdmin: true
        }
      })
      const admins = grpAdmins.map((member)=> member.userId)
      // console.log(grpMessages);
      callback({grpMessages, grpAdmin, admins})
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("grp_message", async(data)=>{
    try {
      // console.log(data);
      const grpMessage = await GroupMessage.create({
        text: data.message,
        groupId: data.groupId,
        senderId: data.from
      })
      socket.join(data.groupId)
      // console.log(`User ${socket.id} sent a message to group ${data.groupId}`);
      io.to(data.groupId).emit("message_from_group",{
        groupId: data.groupId,
        msg: "message_from_group"
      })
    } catch (error) {
      console.log(error);
    }
  })

  // socket.on("restrict_user", async(groupId)=>{
  //   console.log(groupId.groupId);
  //   socket.join(groupId.groupId)
  //   socket.emit("restrict", groupId.groupId)
  // })

  socket.on("get_members_of_group", async({groupId, user_id}, callback)=>{
    try {
      const members = await GroupMember.findAll({
        attributes: [],
        where: {
          groupId: groupId
        },
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        }
      })
      
      const updatedData = members.map((member)=>member.user.dataValues)
      const list = updatedData.filter(item => item.id !== user_id)
      // console.log(list, user_id);
      callback(list)
    } catch (error) {
      console.log(error);
    }
    
    
  })

  socket.on("get_friends_who_are_not_admin", async({groupId}, callback)=>{
    try {
      const members = await GroupMember.findAll({
        attributes: [],
        where: {
          isAdmin: false,
          groupId: groupId
        },
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        }
      })
      
      const list = members.map((member)=>member.user.dataValues)
      // console.log(list);
      callback(list)
    } catch (error) {
      console.log(error);
    }  
  })

  socket.on("make_admin",async({groupName, selectedMembers, groupId})=>{
    try {
      const ids = selectedMembers.map((member)=>member.id)
    
      const grp = await GroupMember.update({isAdmin: true},{
        where:{
          groupId,
          userId: ids
        }
      })

      const socketIds = await User.findAll({
        attributes: ["socket_id"],
        where:{
          id: ids
        }
      })

      const grpAdmins = await GroupMember.findAll({
        attributes: ["userId"],
        where:{
          groupId,
          isAdmin: true
        }
      })

      const admins = grpAdmins.map((member)=> member.userId)
      // console.log(admins);
      socketIds.forEach((li)=>{
        io.to(li.socket_id).emit("made_admin",{
          admins: admins,
          message: `You were now a admin for ${groupName} group !`
        })
      })
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("remove_from_group", async(data)=>{
    // console.log(data);
    try {
      socket.join(data.groupId)

      const ids = data.selectedMembers.map((member)=>member.id)
      // console.log(ids);

      const removedMembers = await GroupMember.destroy({
        where: {
          userId: ids,
          groupId: data.groupId
        }
      })
      const socketIds = await User.findAll({
        where:{
          id: ids
        },
        attributes: ["socket_id"]
      })

      socketIds.forEach((li)=>{
        io.to(li.socket_id).emit("removed_from_group",{
          message: `You were removed from ${data.groupName} group by admin !`
        })
      })
    } catch (error) {
      console.log(error);
    } 
  })

  socket.on("self_remove_from_group", async(data)=>{
    try {
      socket.join(data.groupId)

      const removedMembers = await GroupMember.destroy({
        where: {
          userId: data.user_id,
          groupId: data.groupId
        }
      })
      const socketIds = await User.findByPk(data.user_id,{
        attributes: ["socket_id"]
      })

      io.to(socketIds.socket_id).emit("removed_from_group",{
        message: `You exited from ${data.groupName} group !`
      })
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
  })

  socket.on("get_user_details", async({to_user, user_id}, callback)=>{
    try {
      const userDetails = await User.findByPk(to_user,{
        attributes: ["firstName", "lastName", "avatar", "phonenumber"]
      })  
  
      const groupsUser1 = await Group.findAll({
        include: [
          {
            model: User,
            where: { id: to_user },
            through: { model: GroupMember, attributes: [] },
          },
        ],
        attributes: ['id', 'name'],
      });
  
      const groupsUser2 = await Group.findAll({
        include: [
          {
            model: User,
            where: { id: user_id },
            through: { model: GroupMember, attributes: [] },
          },
        ],
        attributes: ['id', 'name'],
      });
  
      const user1Groups = groupsUser1.map((group) => group.id);
      const commonGroups = groupsUser2.filter((group) => user1Groups.includes(group.id));
  
      const commonGroupsDetails = commonGroups.map((group) => ({
        id: group.id,
        groupName: group.name,
      }));
  
      callback({userDetails, commonGroupsDetails})
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("get_group_details", async({groupId}, callback)=>{
    try {
      const groupDetails = await Group.findByPk(groupId,{
        include: [
          {
            model: User,
            through: { model: GroupMember, attributes: [] },
          },
        ],
        attributes: ["createdBy", "name", "id"]
      })
      // console.log(groupDetails);
      callback(groupDetails)
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("get_self_info", async({user_id}, callback)=>{
    try {
      const userDetails = await User.findByPk(user_id,{
        attributes: ["firstName", "lastName", "email", "phonenumber"]
      })
      callback(userDetails)
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("end",  async (data) => {
    try {
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
    } catch (error) {
      console.log(error);
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
