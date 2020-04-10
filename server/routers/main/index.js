const authRouter = require("../auth/");
const profileRouter = require("../profile");
const requestTraineeRouter = require("../traineeRequests");
module.exports = [...authRouter, ...profileRouter, ...requestTraineeRouter];
