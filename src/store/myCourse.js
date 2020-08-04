import axios from "../plugins/initialAxios";
export default {
  state: {
    activeCourses: [],
    briefcases: []
  },
  mutations: {
    PUSH_MY_COURSE(state, payload) {
      state.activeCourses = payload;
    },
    PUSH_BRIEFCASE(state, payload) {
      state.briefcases = payload;
    }
  },
  actions: {
    getMyCourse({ commit, rootState }, choosenUserId = 0) {
      let user_id;
      if (choosenUserId == 0) {
        user_id = rootState.users.user.user_id;
      } else {
        user_id = choosenUserId;
      }
      axios.get(`/api/getMyCourse/${user_id}`).then(({ data }) => {
        commit("PUSH_MY_COURSE", data);
      });
    }
  },
  getters: {
    getMyCourse: state => state.activeCourses
  }
};
