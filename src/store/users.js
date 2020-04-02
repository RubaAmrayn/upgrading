import axios from "axios";
export default {
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
      return new Promise(resolve => {
        axios
          .post("/api/auth/register", newUser)
          .then(respone => {
            context.commit("SET_USER", respone.data.user);
            resolve(respone.data.user);
          })
          .catch();
      });
    }
  },
  getters: {
    getUser: state => state.user
  }
};
