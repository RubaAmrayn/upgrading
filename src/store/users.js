import axios from "axios";
export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    register(context, newUser) {
      axios
        .post("/api/auth/register", newUser)
        .then(respone => {
          context.commit("SET_USER", respone.data.result);
        })
        .catch();
    }
  },
  getters: {
    getUser: state => state.user
  }
};
