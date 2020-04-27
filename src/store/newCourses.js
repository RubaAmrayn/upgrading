import axios from "../plugins/initialAxios";
export default {
  state: {
    newCourses: []
  },
  mutations: {
    PUSH_NEW_COURSE(state, payload) {
      state.newCourses = payload;
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
    }
  },
  getters: {
    getNewCourses: state => state.newCourses
  }
};
