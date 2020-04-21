module.exports = require("mysql2").createConnection({
  host: "localhost",
  user: "root",
  password: "Ruba@2020",
  database: "upgrading",
  multipleStatements: true
});
