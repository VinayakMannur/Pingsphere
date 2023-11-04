const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const sequelize = require("./util/database");

const allRoutes = require('./routes/index');
const User = require("./models/user");
const ResetPassword = require("./models/resetPassword");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //if error make it to true

app.use(allRoutes);

User.hasMany(ResetPassword);

sequelize
  // .sync({force:true})
  .sync()
  .then((res) => {
    app.listen(port || 5000, () => {
      console.log(`Pingsphere server running on port ${port}`);
    });
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
