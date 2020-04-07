const profileController = require("../../controllers/profile");
const profileUploader = require("../../controllers/profile/uploads");

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
  },
  {
    method: "POST",
    url: "/api/profile/uplaodEducationalAttachement/:qualification_id",
    preHandler: profileUploader.eduUpload.array("eduAttachement"),
    handler: profileController.uplaodEducationalAttachement
  },
  /**
   * Experiences routers
   */
  {
    method: "GET",
    url: "/api/profile/getExperienceTypes",
    handler: profileController.getEXperincesTypes
  },
  {
    method: "GET",
    url: "/api/profile/getExperienceLevels",
    handler: profileController.getEXperincesLevels
  },
  {
    method: "POST",
    url: "/api/profile/insertExperince",
    handler: profileController.insertExperience
  },
  {
    method: "GET",
    url: "/api/profile/getOneUserExperience/:user_id",
    handler: profileController.getOneUserExperience
  }
];
