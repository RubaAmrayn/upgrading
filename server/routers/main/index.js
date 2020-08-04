const authRouter = require("../auth/");
const profileRouter = require("../profile");
const requestTrainerRouter = require("../trainerRequests");
const newCoursesRoutser = require("../newCourses");
const activeCourses = require("../activeCourses");
const myCourse = require("../myCourse");
const myArchiveCourse = require("../archiveCourse");
module.exports = [
  ...authRouter,
  ...profileRouter,
  ...requestTrainerRouter,
  ...newCoursesRoutser,
  ...activeCourses,
  ...myCourse,
  ...myArchiveCourse
];
