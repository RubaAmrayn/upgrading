const profileController = require("../../controllers/profile");
module.exports = [
  {
    method: "GET",
    url: "/api/profile/getEducationalTitles",
    handler: profileController.getEducationalTitles
  },
  {
    method: "POST",
    url: "/api/profile/insertQualification",
    handler: profileController.insertQualification
  },
  {
    method: "GET",
    url: "/api/profile/getOneEducationalQualifications/:user_id",
    handler: profileController.getOneEducationalQualifications
  },
  {
    method: "DELETE",
    url: "/api/profile/deleteOneEducaionalQualifications/:qualification_id",
    handler: profileController.deleteOneEducaionalQualifications
  },
  {
    method: "PATCH",
    url: "/api/profile/updateOnePersonInfo",
    handler: profileController.updatePersonInfo
  }
];
