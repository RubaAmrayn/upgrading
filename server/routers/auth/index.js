// es module import name from "module"
// common js require("module")
const auth = require("../../controllers/auth/index");
module.exports = [
  {
    method: "GET",
    url: "/api/auth/login",
    handler: auth.login
  },
  {
    method: "POST",
    url: "/api/auth/register",
    handler: auth.register
  }
];
