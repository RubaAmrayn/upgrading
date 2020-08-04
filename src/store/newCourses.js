import axios from "../plugins/initialAxios";
export default {
  state: {
    newCourses: [],
    briefcases: []
  },
  mutations: {
    PUSH_NEW_COURSE(state, payload) {
      state.newCourses = payload;
    },
    PUSH_BRIEFCASE(state, payload) {
      state.briefcases = payload;
    }
  },
  actions: {
    addNewCourse({ rootState }, newCourse) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        let data = {};
        data["course_name"] = newCourse.course_name;
        data["daily_hours"] =
          newCourse.daily_hours["endTime"] +
          "-" +
          newCourse.daily_hours["startTime"];
        data["start_date"] = newCourse.course_dates[0];
        data["end_date"] = newCourse.course_dates[1];
        data["course_description"] = newCourse.course_description;
        data["course_price"] = newCourse.course_price;
        data["seats_number"] = newCourse.seats_number;
        data["course_requirements"] = newCourse.course_requirements;
        data["user_id"] = user_id;
        axios.post("/api/newCourses/AddNewCourse", data).then(({ data }) => {
          if (data.insertId > 0) {
            resolve("inserted");
          } else {
            reject();
          }
        });
      });
    },
    updateOneCourse({ dispatch }, course) {
      let data = {};
      data["course_name"] = course.course_name;
      data["daily_hours"] =
        course.daily_hours["endTime"] + "-" + course.daily_hours["startTime"];
      data["start_date"] = course.course_dates[0];
      data["end_date"] = course.course_dates[1];
      data["course_description"] = course.course_description;
      data["course_price"] = course.course_price;
      data["seats_number"] = course.seats_number;
      data["course_requirements"] = course.course_requirements;
      data["course_id"] = course["course_id"];
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/newCourses/UpdateOneCourse`, data)
          .then(({ data }) => {
            if (data) {
              dispatch("getOneNewCourses");
              resolve("updated");
            } else {
              reject();
            }
          });
      });
    },
    deleteOneCourse({ dispatch }, course_id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/newCourses/DeleteOneCourse/${course_id}`)
          .then(({ data }) => {
            if (data) {
              dispatch("getOneNewCourses");
              resolve();
            } else {
              reject();
            }
          });
      });
    },
    getOneNewCourses({ commit, rootState }, choosenUserId = 0) {
      let user_id;
      if (choosenUserId == 0) {
        user_id = rootState.users.user.user_id;
      } else {
        user_id = choosenUserId;
      }
      axios
        .get(`/api/newCourses/getOneNewCourses/${user_id}`)
        .then(({ data }) => {
          if (data) {
            commit("PUSH_NEW_COURSE", data);
          }
        });
    },
    uploadPoster({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let poster = new FormData();
        poster.append("coursePoster", payload.file);
        axios
          .post(
            `/api/newCourses/uploadPoster/${payload["course_id"]}`,
            poster,
            {
              headers: {
                "content-type": "multipart/form-data"
              }
            }
          )
          .then(({ data }) => {
            if (data.result.insertId > 0) {
              dispatch("updatePosterImage", data.rows[0]);
              resolve("PosterUpdated");
            } else {
              reject("errorWhileUploading");
            }
          });
      });
    },
    updatePosterImage({ state }, newPoster) {
      state.newCourses.forEach(course => {
        if (course.course_id === newPoster.courses_course_id) {
          course.poster_id = newPoster.poster_id;
          course.poster_path = newPoster.poster_path;
        }
      });
    },
    uploadOneBriefcase({ commit, dispatch, rootState }, briefcase) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        let briefcaseFormData = new FormData();
        briefcaseFormData.append("briefcaseAttachement", briefcase.file);
        briefcaseFormData.append("briefcaseTitle", briefcase.title);
        briefcaseFormData.append("current_status", briefcase.current_status);
        briefcaseFormData.append("user_id", user_id);
        axios
          .post(
            `/api/newCourses/uploadBriefcase/${briefcase.course_id}`,
            briefcaseFormData,
            {
              headers: {
                "content-type": "multipart/form-data"
              }
            }
          )
          .then(({ data }) => {
            if (data.result[1].insertId > 0) {
              commit("PUSH_BRIEFCASE", data.rows);
              dispatch("getOneNewCourses");
              dispatch("getOneCourseBriefcases", briefcase.course_id);
              resolve("uploaded");
            } else {
              reject();
            }
          });
      });
    },
    getOneCourseBriefcases({ commit }, course_id) {
      axios
        .get(`/api/newCourses/getOneCourseBriefcase/${course_id}`)
        .then(({ data }) => {
          if (data) {
            commit("PUSH_BRIEFCASE", data);
          }
        });
    },
    deleteOneBriefcase({ dispatch }, { briefcase_id, course_id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/newCourses/deleteOneBriefcase/${briefcase_id}`)
          .then(({ data }) => {
            if (data) {
              dispatch("getOneCourseBriefcases", course_id);
              resolve("deleted");
            } else {
              reject();
            }
          });
      });
    },
    // for subervisor only
    getAllNewCourses({ commit }) {
      axios.get("/api/newCourses/getAllNewCourses").then(({ data }) => {
        if (data) {
          commit("PUSH_NEW_COURSE", data);
        }
      });
    },
    rejectBriefcase({ rootState, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;

        let data = {
          user_id,
          course_id: payload.course_id,
          reasons: payload.reasons
        };
        axios.post("/api/newCourses/RejectBriefcase", data).then(({ data }) => {
          if (data[0].insertId > 0) {
            dispatch("getAllNewCourses");
            resolve("rejected");
          } else {
            reject();
          }
        });
      });
    },
    getBriefcaseRejection(context, course_id) {
      return axios
        .get("/api/newCourses/getBriefcaseRejection/" + course_id)
        .then(({ data }) => {
          if (data) {
            return data[0];
          }
        });
    },
    HoldBriefcase({ rootState, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;

        let data = {
          user_id,
          course_id: payload.course_id,
          reasons: payload.reasons
        };
        axios.post("/api/newCourses/HoldBriefcase", data).then(({ data }) => {
          if (data[0].insertId > 0) {
            dispatch("getAllNewCourses");
            resolve("holded");
          } else {
            reject();
          }
        });
      });
    },
    getBriefcaseHolded(context, course_id) {
      return axios
        .get("/api/newCourses/getBriefcaseHolded/" + course_id)
        .then(({ data }) => {
          if (data) {
            return data[0];
          }
        });
    },
    AproveBriefcase({ rootState, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        let data = {
          user_id,
          course_id: payload.course_id
        };
        axios.post("/api/newCourses/AproveBriefcase", data).then(({ data }) => {
          if (data[0].insertId > 0) {
            dispatch("getAllNewCourses");
            resolve("Approved");
          } else {
            reject();
          }
        });
      });
    },
    holdCourse({ rootState, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;

        let data = {
          user_id,
          course_id: payload.course_id,
          reasons: payload.reasons
        };
        axios.post("/api/newCourses/HoldCourse", data).then(({ data }) => {
          if (data[0].insertId > 0) {
            dispatch("getAllNewCourses");
            dispatch("getCourseHolded", payload.course_id);
            resolve("Holded");
          } else {
            reject();
          }
        });
      });
    },
    getCourseHolded(context, course_id) {
      return axios
        .get("/api/newCourses/getCourseHolded/" + course_id)
        .then(({ data }) => {
          if (data) {
            return data[0];
          }
        });
    },
    RejectCourse({ rootState, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;
        let data = {
          user_id,
          course_id: payload.course_id,
          reasons: payload.reasons
        };
        axios.post("/api/newCourses/RejectCourse", data).then(({ data }) => {
          if (data[0].insertId > 0) {
            dispatch("getAllNewCourses");
            resolve("Rejected");
          } else {
            reject();
          }
        });
      });
    },
    getCourseRejected(context, course_id) {
      return axios
        .get("/api/newCourses/getCourseRejected/" + course_id)
        .then(({ data }) => {
          if (data) {
            return data[0];
          }
        });
    },
    ApproveCourse({ rootState, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let user_id = rootState.users.user.user_id;

        let data = {
          user_id,
          course_id: payload.course_id
        };
        axios.post("/api/newCourses/ApproveCourse", data).then(({ data }) => {
          if (data[0].insertId > 0) {
            dispatch("getAllNewCourses");
            resolve("Approved");
          } else {
            reject();
          }
        });
      });
    }
  },
  getters: {
    getNewCourses: state => state.newCourses,
    getBriefcases: state => state.briefcases
  }
};
