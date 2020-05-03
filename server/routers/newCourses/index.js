const newCourses = require("../../controllers/newCourses");
const Uploader = require("../../controllers/newCourses/Uploader");
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
  },
  {
    method: "POST",
    url: "/api/newCourses/uploadPoster/:course_id",
    preHandler: Uploader.PosterUpload.any("coursePoster"),
    handler: newCourses.uploadPoster
  },
  {
    method: "GET",
    url: "/api/newCourses/getAllNewCourses/",
    handler: newCourses.getAllNewCourses
  },
  {
    method: "POST",
    url: "/api/newCourses/uploadBriefcase/:course_id",
    preHandler: Uploader.BriefcaseUpload.any("briefcaseAttachement"),
    handler: newCourses.uploadBriefcase
  },
  {
    method: "GET",
    url: "/api/newCourses/getOneCourseBriefcase/:course_id",
    handler: newCourses.getOneCourseBriefcase
  },
  {
    method: "DELETE",
    url: "/api/newCourses/deleteOneBriefcase/:briefcase_id",
    handler: newCourses.deleteOneBriefcase
  },
  {
    method: "GET",
    url: "/api/newCourses/getAllNewCourses",
    handler: newCourses.getAllNewCourses
  },
  {
    method: "POST",
    url: "/api/newCourses/RejectBriefcase",
    handler: newCourses.RejectBriefcase
  },
  {
    method: "GET",
    url: "/api/newCourses/getBriefcaseRejection/:course_id",
    handler: newCourses.getBriefcaseRejection
  },
  {
    method: "POST",
    url: "/api/newCourses/HoldBriefcase",
    handler: newCourses.HoldBriefcase
  },
  {
    method: "GET",
    url: "/api/newCourses/getBriefcaseHolded/:course_id",
    handler: newCourses.getBriefcaseHolded
  },
  {
    method: "POST",
    url: "/api/newCourses/AproveBriefcase",
    handler: newCourses.AproveBriefcase
  },
  {
    method: "POST",
    url: "/api/newCourses/HoldCourse",
    handler: newCourses.HoldCourse
  },
  {
    method: "GET",
    url: "/api/newCourses/getCourseHolded/:course_id",
    handler: newCourses.getCourseHolded
  },
  {
    method: "POST",
    url: "/api/newCourses/RejectCourse",
    handler: newCourses.RejectCourse
  },
  {
    method: "GET",
    url: "/api/newCourses/getCourseRejected/:course_id",
    handler: newCourses.getCourseRejected
  },
  {
    method: "POST",
    url: "/api/newCourses/ApproveCourse",
    handler: newCourses.ApproveCourse
  }
];
