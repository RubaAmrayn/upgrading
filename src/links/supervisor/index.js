import vuetify from "@/plugins/vuetify";
export default [
  //   {
  //     title: vuetify.framework.lang.t("$vuetify.Pages.newCourseForm"),
  //     icon: "mdi-view-grid-plus",
  //     class: "",
  //     link: "/courses/newCourses/add"
  //   },
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.pindingCourseRequests"),
    icon: "mdi-folder-clock",
    class: "",
    link: "/courses/newCourses/pinding"
  },
  //   {
  //     title: vuetify.framework.lang.t("$vuetify.Pages.myCourses"),
  //     icon: "mdi-view-dashboard",
  //     class: "",
  //     link: ""
  //   },
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.trainerRequestsActive"),
    icon: "mdi-archive",
    class: "",
    link: "/trainerRequests/active"
  },
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.trainerRequestsArchive"),
    icon: "mdi-archive",
    class: "",
    link: "/trainerRequests/archive"
  },
  {
    title: vuetify.framework.lang.t("$vuetify.Pages.About"),
    icon: "mdi-account-group",
    class: "",
    link: "/About"
  }
];
