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
          .then(response => {
            console.log(response);
            context.commit("SET_USER", response.data);
            resolve(response.data);
          })
          .catch();
      });
    },
    login(context, user) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/auth/login", user)
          .then(response => {
            if (response.data.length > 0) {
              context.commit("SET_USER", response.data[0]);
              resolve(response.data);
            } else {
              reject("no data");
            }
          })
          .catch(error => reject(error));
      });
    }
  },
  getters: {
    getUser: state => state.user,
    isTrainer: state => state.user.role.role_id == 1,
    isTrainee: state => state.user.role.role_id == 2,
    isManager: state => state.user.role.role_id == 3
  }
};
