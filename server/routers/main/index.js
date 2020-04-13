const authRouter = require("../auth/");
const profileRouter = require("../profile");
const requestTrainerRouter = require("../trainerRequests");
const newCoursesRoutser = require("../newCourses");
module.exports = [
  ...authRouter,
  ...profileRouter,
  ...requestTrainerRouter,
  ...newCoursesRoutser
];
