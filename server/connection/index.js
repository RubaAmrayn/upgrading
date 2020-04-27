require("dotenv").config();
module.exports = require("mysql2").createConnection({
  host: process.env.DbHost,
  user: process.env.DbUser,
  password: process.env.DbPassword,
  database: process.env.Db,
  multipleStatements: true
});
