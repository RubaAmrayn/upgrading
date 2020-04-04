const authRouter = require("../auth/");
const profileRouter = require("../profile");
module.exports = [...authRouter, ...profileRouter];
