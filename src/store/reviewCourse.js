import axios from "../plugins/initialAxios";
export default {
  state: {
    activeCourses: []
  },
  mutations: {
    PUSH_ACTIVE_COURSES(state, payload) {
      state.activeCourses = payload;
    }
  },
  actions: {
    getActiveCourses({ commit }) {
      axios.get("/api/getActiveCourses").then(({ data }) => {
        commit("PUSH_ACTIVE_COURSES", data);
      });
    }
  },
  getters: {
    getActiveCourses: state => state.activeCourses
  }
};
