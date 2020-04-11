import axios from "@/plugins/initialAxios.js";
let Formater = date => {
  let dt = new Date(date);
  return [
    dt.getFullYear(),
    ("0" + (dt.getMonth() + 1)).slice(-2),
    ("0" + dt.getDate()).slice(-2)
  ].join("-");
};
export default {
  state: {
    educational_titles: [],
    qualifications: [],
    qualification_attachements: [],
    experiences: [],
    experince_types: [],
    experince_levels: [],
    experiences_attachements: []
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
    PUSH_QUALIFICATION_ATTACHEMENTS(state, payload) {
      state.qualification_attachements = payload;
    },
    SET_EXP_TYPES(state, payload) {
      state.experince_types = payload;
    },
    SET_EXP_LEVELS(state, payload) {
      state.experince_levels = payload;
    },
    PUSH_EXPERIENCE_ATTACHEMENTS(state, payload) {
      state.experiences_attachements = payload;
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
    FillEduForm({ getters }, qualification_id) {
      let qualification = getters.getQualifications
        .filter(qualification => {
          return qualification.qualification_id == qualification_id;
        })
        .map(filteredQualification => {
          return {
            universty_name: filteredQualification.universty_name,
            graduation_year: filteredQualification.graduation_year,
            qualification_title: {
              title_id: filteredQualification.title_id,
              ar_title: filteredQualification.ar_title,
              en_title: filteredQualification.en_title
            }
          };
        });
      return qualification[0];
    },
    FillExpForm({ getters }, experience_id) {
      let experience = getters.getExperinces
        .filter(experience => experience.experince_id == experience_id)
        .map(experince => {
          return {
            experience_name: experince.experince_name,
            experience_dates: [
              Formater(experince.start_date),
              Formater(experince.end_date)
            ],
            experience_type: {
              type_id: experince.type_id,
              ar_experince_type: experince.ar_experince_type,
              en_experince_type: experince.en_experince_type
            },
            experience_level: {
              exp_level_id: experince.exp_level_id,
              ar_exp_level: experince.ar_exp_level,
              en_exp_level: experince.en_exp_level
            }
          };
        });
      return experience;
    },
    updateQualification({ dispatch, rootState }, qualification) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        axios
          .patch("/api/profile/updateQualification", qualification)
          .then(({ data }) => {
            if (data.changedRows == 0 && data.affectedRows > 0) {
              resolve("nothing_new");
            } else if (data.changedRows > 0) {
              dispatch("getEducationalOneQualifications", user_id);
              resolve("Updated");
            }
          })
          .catch(error => reject(error));
      });
    },
    getEducationalOneQualifications({ commit, rootState }, choosenUserId) {
      let user_id;
      if (choosenUserId == 0) {
        user_id = rootState.users.user.user_id;
      } else {
        user_id = choosenUserId;
      }
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
            if (response.data[3].affectedRows > 0) {
              dispatch("getEducationalOneQualifications");
              resolve("deleted");
            } else {
              reject();
            }
          });
      });
    },
    uplaodEducationalAttachement({ dispatch }, payload) {
      let formData = new FormData();
      payload.files.forEach(file => formData.append("eduAttachement", file));
      return new Promise((resolve, reject) => {
        axios
          .post(
            "/api/profile/uplaodEducationalAttachement/" +
              payload.qualification_id,
            formData,
            {
              headers: {
                "content-type": "multipart/form-data"
              }
            }
          )
          .then(({ data }) => {
            if (data) {
              dispatch(
                "getOneEducationalAttachements",
                payload.qualification_id
              );
              resolve("uploaded");
            }
          })
          .catch(err => reject(err));
      });
    },
    getOneEducationalAttachements({ commit, rootState }, qualification_id) {
      let user_id = rootState.users.user.user_id;
      axios
        .get(
          `/api/profile/getAllEducationalAttchements/${user_id}/${qualification_id}`
        )
        .then(({ data }) => {
          if (data) {
            commit("PUSH_QUALIFICATION_ATTACHEMENTS", data);
          }
        });
    },
    deleteOneEducationalAttachements({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            "/api/profile/deleteOneEducaionalAttachements/" +
              payload.attachement_id
          )
          .then(({ data }) => {
            if (data.affectedRows > 0) {
              dispatch(
                "getOneEducationalAttachements",
                payload.qualification_id
              );
              resolve("deleted");
            } else {
              reject("not deleted");
            }
          });
      });
    },
    deleteOneExperience({ dispatch, rootState }, experience_id) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        axios
          .delete("/api/profile/deleteOneExperience/" + experience_id)
          .then(({ data }) => {
            if (data[3].affectedRows > 0) {
              dispatch("getOneUserExperience", user_id);
              resolve("deleted");
            } else {
              reject("not deleted");
            }
          });
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
    updateExperince({ dispatch, rootState }, experience) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        axios
          .patch("/api/profile/updateExperince", experience)
          .then(({ data }) => {
            if (data.changedRows == 0 && data.affectedRows > 0) {
              resolve("nothing_new");
            } else if (data.changedRows > 0) {
              dispatch("getOneUserExperience", user_id);
              resolve("Updated");
            } else {
              reject("not updted");
            }
          })
          .catch(err => reject(err));
      });
    },
    uplaodExperienceAttachement({ dispatch }, payload) {
      let formData = new FormData();
      payload.files.forEach(file => formData.append("expAttachement", file));
      return new Promise((resolve, reject) => {
        axios
          .post(
            `/api/profile/uplaodEexperienceAttachement/${payload.experience_id}`,
            formData,
            {
              headers: {
                "content-type": "multipart/form-data"
              }
            }
          )
          .then(({ data }) => {
            if (data) {
              dispatch("getOneExperienceAttachements", payload.experience_id);
              resolve("uploaded");
            }
          })
          .catch(err => reject(err));
      });
    },
    getOneUserExperience({ commit, rootState }, choosenUserId) {
      return new Promise((resolve, reject) => {
        let user_id;
        if (choosenUserId == 0) {
          user_id = rootState.users.user.user_id;
        } else {
          user_id = choosenUserId;
        }
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
    },
    getOneExperienceAttachements({ commit }, experience_id) {
      axios
        .get(`/api/profile/getOneEexperienceAttachement/${experience_id}`)
        .then(({ data }) => {
          if (data) {
            commit("PUSH_EXPERIENCE_ATTACHEMENTS", data);
          }
        });
    },
    deleteOneExperienceAttachements({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `/api/profile/deleteOneExperienceAttachements/${payload.experinces_attachement_id}`
          )
          .then(({ data }) => {
            if (data.affectedRows > 0) {
              dispatch("getOneExperienceAttachements", payload.experience_id);
              resolve("deleted");
            } else {
              reject("not deleted");
            }
          });
      });
    }
  },
  getters: {
    Educational_titles: state => state.educational_titles,
    getQualifications: state => state.qualifications,
    getQualification_attachements: state => state.qualification_attachements,
    getExperinces: state => state.experiences,
    getExpTypes: state => state.experince_types,
    getExpLevels: state => state.experince_levels,
    getEexperience_attachement: state => state.experiences_attachements
  }
};
