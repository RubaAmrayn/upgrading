const newCourses = require("../../controllers/newCourses");
module.exports = [
  {
    method: "POST",
    url: "/api/newCourses/AddNewCourse",
    handler: newCourses.AddNewCourse
  },
  {
    method: "GET",
    url: "/api/newCourses/getOneNewCourses/:user_id",
    handler: newCourses.getOneNewCourses
  }
];
