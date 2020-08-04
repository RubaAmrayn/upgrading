import Vue from "vue";
import VueRouter from "vue-router";
import vuetify from "../plugins/vuetify";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.Home")
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.About")
    }
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("@/views/auth/login"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.login")
    }
  },
  {
    path: "/Sign",
    name: "sign",
    component: () => import("@/views/auth/sign"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.sign")
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/profile"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.profile")
    }
  },
  {
    path: "/trainerRequests/active",
    name: "active-trainer-requests",
    component: () => import("@/views/trainerRequests/activeRequests"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.trainerRequestsActive")
    }
  },
  {
    path: "/trainerRequests/archive",
    name: "archive-trainer-requests",
    component: () => import("@/views/trainerRequests/archiveRequests"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.trainerRequestsArchive")
    }
  },
  {
    path: "/courses/newCourses",
    name: "new-courses",
    component: () => import("@/views/courses/newCourses"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.newCourses")
    }
  },
  {
    path: "/courses/newCourses/add",
    name: "new-course-form",
    component: () => import("@/views/courses/newCourses/NewCourseForm.vue"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.newCourseForm")
    }
  },
  {
    path: "/courses/newCourses/pinding",
    name: "pinding-course",
    component: () => import("@/views/courses/newCourses/PendingCourses.vue"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.pindingCourseRequests")
    }
  },
  {
    path: "/reviewCourse",
    name: "review-course",
    component: () => import("@/views/reviewCourse.vue"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.reviewCourses")
    }
  },

  {
    path: "/myCourse",
    name: "my-course",
    component: () => import("@/views/myCourse.vue"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.myCourses")
    }
  },
  {
    path: "/archiveCourse",
    name: "archive-course",
    component: () => import("@/views/archiveCourse.vue"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.myArchiveCourses")
    }
  }
];

const router = new VueRouter({
  routes
});
router.afterEach(to => {
  Vue.nextTick(() => {
    document.title =
      to.meta.title +
      " | " +
      vuetify.framework.lang.t("$vuetify.Pages.AppName");
  });
});
export default router;
