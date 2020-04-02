import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {}, //تعريف البيانات
  mutations: {}, // اسناد القيم على البيانات [state]
  actions: {}, // اضافة دوال لاستخدامها على مستوى ال vuex
  getters: {}, // computed vuex => استرجاع قيم ال state
  modules: {
    users
  }
});
