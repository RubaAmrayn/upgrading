import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import profile from "./profile";
import requestTrainer from "./requestTrainer";
import newCourses from "./newCourses";
import VuexPersist from "vuex-persist";

const VuexPersistStorage = new VuexPersist({
  key: "vuex-session",
  storage: window.sessionStorage
});
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [VuexPersistStorage.plugin],
  state: {},
  mutations: {
    LOG_OUT(state) {
      if (state.users) {
        state.users.user = {};
      }
      if (state.profile) {
        state.profile.qualifications = [];
        state.profile.qualification_attachements = [];
        state.profile.experiences = [];
        state.profile.experiences_attachements = [];
        // delete state.profile;
      }
      if (state.requestTrainer) {
        state.requestTrainer.status = [];
        state.requestTrainer.active_requests = [];
        state.requestTrainer.archive_requests = [];
        // delete state.requestTrainer;
      }
      window.sessionStorage.clear();
    }
  },
  actions: {},
  getters: {},
  modules: {
    users,
    profile,
    requestTrainer,
    newCourses
  }
});
