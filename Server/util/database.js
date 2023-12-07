const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: 3306,
  }
);

module.exports = sequelize;
