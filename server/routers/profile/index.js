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
    method: "PATCH",
    url: "/api/profile/updateQualification",
    handler: profileController.updateQualification
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
  {
    method: "GET",
    url: "/api/profile/getAllEducationalAttchements/:user_id/:qualification_id",
    handler: profileController.getAllEducationalAttchements
  },
  {
    method: "DELETE",
    url:
      "/api/profile/deleteOneEducaionalAttachements/:educational_attachement_id",
    handler: profileController.deleteOneEducaionalAttachements
  },
  // {
  //   method: "GET",
  //   url: "/public/:path",
  //   handler: profileController.serveEducationalAttchements
  // },
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
    method: "PATCH",
    url: "/api/profile/updateExperince",
    handler: profileController.updateExperince
  },
  {
    method: "GET",
    url: "/api/profile/getOneUserExperience/:user_id",
    handler: profileController.getOneUserExperience
  },
  {
    method: "DELETE",
    url: "/api/profile/deleteOneExperience/:experince_id",
    handler: profileController.deleteOneExperience
  },
  {
    method: "POST",
    url: "/api/profile/uplaodEexperienceAttachement/:experience_id",
    preHandler: profileUploader.expUpload.array("expAttachement"),
    handler: profileController.uplaodEexperienceAttachement
  },
  {
    method: "GET",
    url: "/api/profile/getOneEexperienceAttachement/:experience_id",
    handler: profileController.getOneEexperienceAttachement
  },
  {
    method: "DELETE",
    url:
      "/api/profile/deleteOneExperienceAttachements/:experinces_attachement_id",
    handler: profileController.deleteOneExperienceAttachements
  }
];
