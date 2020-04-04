const profileController = require("../../controllers/profile");
module.exports = [
  {
    method: "GET",
    url: "/api/profile/getEducationalTitles",
    handler: profileController.getEducationalTitles
  }
];
