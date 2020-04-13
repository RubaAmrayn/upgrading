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
    PUSH_ACTIVE_TRAINER_REQUESTS(state, payload) {
      state.active_requests = payload;
    },
    PUSH_ARCHIVE_TRAINER_REQUESTS(state, payload) {
      state.archive_requests = payload;
    }
  },
  actions: {
    requestTrainer({ dispatch, rootState }) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        axios
          .post(`/api/requestTrainer/requestNewTrainer/${user_id}`)
          .then(({ data }) => {
            if (data.insertId > 0) {
              dispatch("getOneTrainerRequest");
              resolve("requested");
            } else {
              reject();
            }
          });
      });
    },
    getOneTrainerRequest({ commit, rootState }) {
      let user_id = rootState.users.user.user_id;
      axios
        .get(`/api/requestTrainer/getOneTrainerRequest/${user_id}`)
        .then(({ data }) => {
          if (data.length > 0) {
            commit("SET_STATUS", data);
          }
        });
    },
    getAllActiveTrainerRequest({ commit }) {
      axios
        .get("/api/requestTrainer/getAllActiveTrainerRequest")
        .then(({ data }) => {
          if (data) {
            commit("PUSH_ACTIVE_TRAINER_REQUESTS", data);
          }
        });
    },
    getAllArchiveTrainerRequest({ commit }) {
      axios
        .get("/api/requestTrainer/getAllAechiveTrainerRequest")
        .then(({ data }) => {
          if (data) {
            commit("PUSH_ARCHIVE_TRAINER_REQUESTS", data);
          }
        });
    },
    AcceptTrainer({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/requestTrainer/AcceptOneTrainer", payload)
          .then(({ data }) => {
            if (data[1].changedRows > 0 && data[2].changedRows > 0) {
              dispatch("getAllActiveTrainerRequest");
              resolve("Upgraded");
            } else {
              reject("nothing updated");
            }
          });
      });
    },
    RejectTrainer({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/requestTrainer/RejectOneTrainer", payload)
          .then(({ data }) => {
            if (data.changedRows > 0) {
              dispatch("getAllActiveTrainerRequest");
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
    getAllActiveTrainerRequests: state => state.active_requests,
    getAllArchiveTrainerRequests: state => state.archive_requests
  }
};
