import axios from "../plugins/initialAxios";
export default {
  state: {
    archiveCourse: [],
    briefcases: []
  },
  mutations: {
    PUSH_MY_ARCHIVE_COURSE(state, payload) {
      state.archiveCourse = payload;
    },
    PUSH_BRIEFCASE(state, payload) {
      state.briefcases = payload;
    }
  },
  actions: {
    getMyArchiveCourse({ commit, rootState }, choosenUserId = 0) {
      let user_id;
      if (choosenUserId == 0) {
        user_id = rootState.users.user.user_id;
      } else {
        user_id = choosenUserId;
      }
      axios.get(`/api/getMyArchiveCourse/${user_id}`).then(({ data }) => {
        commit("PUSH_MY_ARCHIVE_COURSE", data);
      });
    }
  },

  getters: {
    getMyArchiveCourse: state => state.archiveCourse
  }
};
