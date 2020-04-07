import axios from "axios";

export default {
  state: {
    educational_titles: [],
    qualifications: [],
    experiences: [],
    experince_types: [],
    experince_levels: []
  },
  mutations: {
    SET_EDU_TITLES(state, payload) {
      state.educational_titles = payload;
    },
    PUSH_QUALIFICATION(state, payload) {
      state.qualifications = payload;
    },
    PUSH_EXPERIENCES(state, payload) {
      state.experiences = payload;
    },
    SET_EXP_TYPES(state, payload) {
      state.experince_types = payload;
    },
    SET_EXP_LEVELS(state, payload) {
      state.experince_levels = payload;
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
    },
    uplaodEducationalAttachement({ state }, data) {
      let formData = new FormData();
      data.files.forEach(file => formData.append("eduAttachement", file));
      console.log(state);
      console.log(data.qualification_id);

      return new Promise((resolve, reject) => {
        axios
          .post(
            "/api/profile/uplaodEducationalAttachement/" +
              data.qualification_id,
            formData,
            {
              headers: {
                "content-type": "multipart/form-data"
              }
            }
          )
          .then(({ data }) => {
            console.log(data);
            resolve();
          })
          .catch(err => reject(err));
      });
    },
    getExpTypes({ commit }) {
      axios.get("/api/profile/getExperienceTypes").then(({ data }) => {
        if (data.length > 0) {
          commit("SET_EXP_TYPES", data);
        }
      });
    },
    getExpLevels({ commit }) {
      axios.get("/api/profile/getExperienceLevels").then(({ data }) => {
        if (data.length > 0) {
          commit("SET_EXP_LEVELS", data);
        }
      });
    },
    insertExperience({ dispatch, rootState }, new_experience) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        console.log("new experince", new_experience);
        let data = Object.assign(
          {},
          {
            experience_name: new_experience.experience_name,
            start_date: new_experience.experience_dates[0],
            end_date: new_experience.experience_dates[1],
            Experience_types_id: new_experience.experience_type.type_id,
            user_id,
            experience_level: new_experience.experience_level.exp_level_id
          }
        );
        axios
          .post("/api/profile/insertExperince", data)
          .then(({ data }) => {
            if (data.insertId > 0) {
              dispatch("getOneUserExperience");
              resolve("inserted");
            } else {
              reject("failed");
            }
          })
          .catch(err => reject(err));
      });
    },
    getOneUserExperience({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        axios
          .get("/api/profile/getOneUserExperience/" + user_id)
          .then(({ data }) => {
            if (data) {
              commit("PUSH_EXPERIENCES", data);
              resolve();
            }
          })
          .catch(err => reject(err));
      });
    }
  },
  getters: {
    Educational_titles: state => state.educational_titles,
    getQualifications: state => state.qualifications,
    getExperinces: state => state.experiences,
    getExpTypes: state => state.experince_types,
    getExpLevels: state => state.experince_levels
  }
};
