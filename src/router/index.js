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
    path: "/traineeRequests/active",
    name: "active-trainee-requests",
    component: () => import("@/views/traineeRequests/activeRequests"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.traineeRequestsActive")
    }
  },
  {
    path: "/traineeRequests/archive",
    name: "archive-trainee-requests",
    component: () => import("@/views/traineeRequests/archiveRequests"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.traineeRequestsArchive")
    }
  },
  {
    path: "/courses/newCourse",
    name: "new-courses",
    component: () => import("@/views/courses/newCourse"),
    meta: {
      title: vuetify.framework.lang.t("$vuetify.Pages.AddNewCourse")
    },
    children: [
      {
        path: "add",
        name: "add-new-course-form",
        component: () =>
          import("@/components/courses/newCourse/addNewCourseForm"),
        meta: {
          title: "Form"
        }
      },
      {
        path: "list"
      }
    ]
  }
];

const router = new VueRouter({
  routes
});
router.afterEach(to => {
  console.log(to);

  Vue.nextTick(() => {
    document.title =
      to.meta.title +
      " | " +
      vuetify.framework.lang.t("$vuetify.Pages.AppName");
  });
});
export default router;
