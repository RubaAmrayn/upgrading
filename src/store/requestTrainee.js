import axios from "axios";
export default {
  state: {
    status: [],
    active_requests: [],
    archive_requests: []
  },
  mutations: {
    SET_STATUS(state, payload) {
      state.status = payload;
    },
    PUSH_ACTIVE_TRAINEE_REQUESTS(state, payload) {
      state.active_requests = payload;
    },
    PUSH_ARCHIVE_TRAINEE_REQUESTS(state, payload) {
      state.archive_requests = payload;
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
          if (data) {
            commit("PUSH_ACTIVE_TRAINEE_REQUESTS", data);
          }
        });
    },
    getAllArchiveTraineeRequest({ commit }) {
      axios
        .get("/api/requestTrainee/getAllAechiveTraineeRequest")
        .then(({ data }) => {
          if (data) {
            commit("PUSH_ARCHIVE_TRAINEE_REQUESTS", data);
          }
        });
    },
    AcceptTrainee({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/requestTrainee/AcceptOneTrainee", payload)
          .then(({ data }) => {
            if (data[1].changedRows > 0 && data[2].changedRows > 0) {
              dispatch("getAllActiveTraineeRequest");
              resolve("Upgraded");
            } else {
              reject("nothing updated");
            }
          });
      });
    },
    RejectTrainee({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/requestTrainee/RejectOneTrainee", payload)
          .then(({ data }) => {
            if (data.changedRows > 0) {
              dispatch("getAllActiveTraineeRequest");
              resolve("Rejected");
            } else {
              reject("nothing rejected");
            }
          });
      });
    }
  },
  getters: {
    getStatus: state => state.status,
    getLastStatus: state =>
      state.status.length > 0
        ? state.status[state.status.length - 1].status_id
        : 0,
    getAllActiveTraineeRequests: state => state.active_requests,
    getAllArchiveTraineeRequests: state => state.archive_requests
  }
};
