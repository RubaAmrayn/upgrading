import axios from "axios";
export default {
  state: {
    status: [],
    requests: []
  },
  mutations: {
    SET_STATUS(state, payload) {
      state.status = payload;
    },
    PUSH_TRAINEE_REQUESTS(state, payload) {
      state.requests = payload;
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
    },
    getAllActiveTraineeRequest({ commit }) {
      axios
        .get("/api/requestTrainee/getAllActiveTraineeRequest")
        .then(({ data }) => {
          if (data.length > 0) {
            commit("PUSH_TRAINEE_REQUESTS", data);
          }
        });
    }
  },
  getters: {
    getStatus: state => state.status,
    getLastStatus: state =>
      state.status.length > 0
        ? state.status[state.status.length - 1].status_id
        : 0,
    getAllTraineeRequests: state => state.requests
  }
};
