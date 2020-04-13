const authRouter = require("../auth/");
const profileRouter = require("../profile");
const requestTrainerRouter = require("../trainerRequests");
module.exports = [...authRouter, ...profileRouter, ...requestTrainerRouter];
