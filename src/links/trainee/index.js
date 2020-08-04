import vuetify from "@/plugins/vuetify";
export default [
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.About"),
    icon: "mdi-account-group",
    class: "",
    link: "/About"
  },
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.reviewCourses"),
    icon: "mdi-view-list",
    class: "",
    link: "/reviewCourse"
  },
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.pindingCourseRequests"),
    icon: "mdi-folder-clock",
    class: "",
    link: "/courses/newCourses/pinding"
  },
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.myCourses"),
    icon: "mdi-view-dashboard",
    class: "",
    link: "/myCourse"
  },
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.myArchiveCourses"),
    icon: "mdi-archive",
    class: "",
    link: "/archiveCourse"
  }
];
