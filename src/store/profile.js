import axios from "axios";

export default {
  state: {
    educational_titles: []
  },
  mutations: {
    SET_EDU_TITLES(state, payload) {
      state.educational_titles = payload;
    }
  },
  actions: {
    getEduTitles({ commit }) {
      axios.get("/api/profile/getEducationalTitles").then(({ data }) => {
        if (data.length > 0) {
          commit("SET_EDU_TITLES", data);
        }
      });
    }
  },
  getters: {
    Educational_titles: state => state.educational_titles
  }
};
