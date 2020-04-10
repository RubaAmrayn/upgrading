import axios from "axios";
export default {
  state: {
    status: []
  },
  mutations: {
    SET_STATUS(state, payload) {
      state.status = payload;
    }
  },
  actions: {
    requestTrainee({ dispatch, rootState }) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        axios
          .post(`/api/requestTrainee/requestNewTrainee/${user_id}`)
          .then(({ data }) => {
            if (data.insertId > 0) {
              dispatch("getOneTraineeRequest");
              resolve("requested");
            } else {
              reject();
            }
          });
      });
    },
    getOneTraineeRequest({ commit, rootState }) {
      let user_id = rootState.users.user.user_id;
      axios
        .get(`/api/requestTrainee/getOneTraineeRequest/${user_id}`)
        .then(({ data }) => {
          if (data.length > 0) {
            commit("SET_STATUS", data);
          }
        });
    }
  },
  getters: {
    getStatus: state => state.status,
    getLastStatus: state =>
      state.status.length > 0
        ? state.status[state.status.length - 1].status_id
        : 0
  }
};
