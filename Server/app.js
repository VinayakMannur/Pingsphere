const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

const sequelize = require("./util/database");

const allRoutes = require("./routes/index");
const User = require("./models/user");
const ResetPassword = require("./models/resetPassword");
const FriendRequest = require("./models/friendRequest");
const OneToOneMessage = require("./models/oneToOneMessage");

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
  foreignKey: 'recipient'
})
FriendRequest.belongsTo(User);
User.hasMany(FriendRequest,{
  foreignKey: 'sender'
})
FriendRequest.belongsTo(User);

User.hasMany(OneToOneMessage,{
  foreignKey: 'participant1'
})
User.hasMany(OneToOneMessage,{
  foreignKey: 'participant2'
})
User.hasMany(OneToOneMessage,{
  foreignKey: 'message_to'
})
User.hasMany(OneToOneMessage,{
  foreignKey: 'message_from'
})



//for socket
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});



sequelize
  // .sync({ force: true })
  .sync();

server.listen(port || 5000, () => {
  console.log(`Pingsphere server running on port ${port}`);
});




//for socket
io.on("connection", async (socket) => {
  // console.log("????????", JSON.stringify(socket.handshake.query));
  const user_id = socket.handshake.query.user_id

  const socket_id = socket.id

  console.log(`user connected is ${user_id} and ${socket_id}`);

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

    await FriendRequest.create({sender: data.from, recipient: data.to, userId: data.from})

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
  // socket.on("get_direct_conversations", async ({user_id}, callback)=>{

  //get all conversation of user of uder_id
  //inside participents in onetoonemessages table get all the things where participents is user_id and even the names of all participenst where the user_id is linked
  // get user firstname last name id email status
  //   const existing_conversation = await OneToOneMessage.findAll({
  //     where: {
  //       participant1: user_id,
  //       participant2: user_id
  //     },
  //     include: User
  //   })

  //   callback(existing_conversation)
  // })

  //handle text message event
  socket.on("text_message", (data) => {
    console.log("text_message",data);

    // data: to, from ,text,

    // create a new conversation if doesnt exist , if exist add new message to it

    // save to db

    // emit incoming message - to user

    // emit outgoing message - from user

  })

  socket.on("end",  async (data) => {
    if(data.user_id){
      const user = await User.update({status: "Offline"},{
        where: {
          id: user_id
        }
      })

      //Todo : boradcast user disconnected to friends

      console.log("closing connection");
      socket.disconnect(0)
    }
  });
})


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
