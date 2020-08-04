const archiveCourse = require("../../controllers/archiveCourse");
module.exports = [
  {
    method: "GET",
    url: "/api/getMyArchiveCourse/:user_id",
    handler: archiveCourse.getMyArchiveCourse
  }
];
