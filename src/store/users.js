import axios from "@/plugins/initialAxios.js";
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
    },
    UPDATE_USER(state, payload) {
      state.user.first_name = payload.first_name;
      state.user.middle_name = payload.middle_name;
      state.user.last_name = payload.last_name;
      state.user.date_of_birth = payload.date_of_birth;
      state.user.phone = payload.phone;
      state.user.email = payload.email;
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
    logOut({ commit, rootState }) {
      rootState.profile.qualifications = [];
      rootState.profile.qualification_attachements = [];
      rootState.profile.experiences = [];
      rootState.profile.experiences_attachements = [];
      rootState.requestTrainee.status = [];
      rootState.requestTrainee.active_requests = [];
      rootState.requestTrainee.archive_requests = [];
      commit("LOG_OUT");
    },
    updateUser({ commit, state }, user) {
      let user_id = state.user.user_id;
      let data = Object.assign({}, user, { user_id });
      return new Promise((resolve, reject) => {
        axios
          .patch("/api/profile/updateOnePersonInfo", data)
          .then(response => {
            if (
              response.data.changedRows == 0 &&
              response.data.affectedRows > 0
            ) {
              resolve("nothing_new");
            } else if (response.data.changedRows > 0) {
              resolve("Updated");
              commit("UPDATE_USER", data);
            }
          })
          .catch(error => reject(error));
      });
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
