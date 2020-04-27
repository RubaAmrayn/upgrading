const newCourses = require("../../controllers/newCourses");
module.exports = [
  {
    method: "POST",
    url: "/api/newCourses/AddNewCourse",
    handler: newCourses.AddNewCourse
  },
  {
    method: "PATCH",
    url: "/api/newCourses/UpdateOneCourse",
    handler: newCourses.updateOneCourse
  },
  {
    method: "DELETE",
    url: "/api/newCourses/DeleteOneCourse/:course_id",
    handler: newCourses.deleteOneCourse
  },
  {
    method: "GET",
    url: "/api/newCourses/getOneNewCourses/:user_id",
    handler: newCourses.getOneNewCourses
  }
];
