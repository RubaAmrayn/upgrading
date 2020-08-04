const activeCourses = require("../../controllers/activeCourses");
module.exports = [
  {
    method: "GET",
    url: "/api/getActiveCourses",
    handler: activeCourses.getActiveCourses
  }
];
