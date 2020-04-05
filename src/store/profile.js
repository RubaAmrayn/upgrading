import axios from "axios";

export default {
  state: {
    educational_titles: [],
    qualifications: []
  },
  mutations: {
    SET_EDU_TITLES(state, payload) {
      state.educational_titles = payload;
    },
    PUSH_QUALIFICATION(state, payload) {
      state.qualifications = payload;
    }
  },
  actions: {
    getEduTitles({ commit }) {
      axios.get("/api/profile/getEducationalTitles").then(({ data }) => {
        if (data.length > 0) {
          commit("SET_EDU_TITLES", data);
        }
      });
    },
    insertQualification({ dispatch, rootState }, qualification) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        let data = Object.assign({}, qualification, { user_id });
        axios
          .post("/api/profile/insertQualification", data)
          .then(response => {
            if (response.data.insertId > 0) {
              dispatch("getEducationalOneQualifications");
              resolve("inserted");
            } else {
              reject();
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getEducationalOneQualifications({ commit, rootState }) {
      let user_id = rootState.users.user.user_id;
      axios
        .get("/api/profile/getOneEducationalQualifications/" + user_id)
        .then(response => {
          if (response.data) {
            commit("PUSH_QUALIFICATION", response.data);
          }
        });
    },
    deletEducationalOneQualifications({ dispatch }, qualification_id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            "/api/profile/deleteOneEducaionalQualifications/" + qualification_id
          )
          .then(response => {
            if (response.data[2].affectedRows > 0) {
              dispatch("getEducationalOneQualifications");
              resolve("deleted");
            } else {
              reject();
            }
          });
      });
    }
  },
  getters: {
    Educational_titles: state => state.educational_titles,
    getQualifications: state => state.qualifications
  }
};
