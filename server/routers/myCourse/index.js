const mycourse = require("../../controllers/myCourse");
module.exports = [
  {
    method: "GET",
    url: "/api/getMyCourse/:user_id",
    handler: mycourse.getMyCourse
  }
];
