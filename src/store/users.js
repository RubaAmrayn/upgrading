import axios from "axios";
export default {
  state: {
    user: {}
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    LOG_OUT(state) {
      state.user = {};
    }
  },
  actions: {
    register({ commit }, newUser) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/auth/register", newUser)
          .then(response => {
            commit("SET_USER", response.data);
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/auth/login", user)
          .then(response => {
            if (response.data.length > 0) {
              commit("SET_USER", response.data[0]);
              resolve(response.data);
            } else {
              reject("no data");
            }
          })
          .catch(error => reject(error));
      });
    },
    logOut({ commit }) {
      commit("LOG_OUT");
    }
  },
  getters: {
    getUser: state => state.user,
    isLoggedIn: state => !!Object.keys(state.user).includes("role_id"),
    isTrainer: state => state.user.role_id == 1,
    isTrainee: state => state.user.role_id == 2,
    isManager: state => state.user.role_id == 3
  }
};
