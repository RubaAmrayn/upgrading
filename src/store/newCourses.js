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
        let data = Object.assign(
          {},
          {
            course_name: newCourse.course_name,
            daily_hours: newCourse.daily_hours,
            start_date: newCourse.course_dates[0],
            end_date: newCourse.course_dates[1],
            course_description: newCourse.course_description,
            course_price: newCourse.course_price,
            seats_number: newCourse.seats_number,
            course_requirements: newCourse.course_requirements,
            user_id
          }
        );
        axios.post("/api/newCourses/AddNewCourse", data).then(({ data }) => {
          if (data[0].insertId > 0) {
            resolve("inserted");
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
  getters: {}
};
