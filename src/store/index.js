import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import profile from "./profile";
import VuexPersist from "vuex-persist";

const VuexPersistStorage = new VuexPersist({
  key: "vuex-session",
  storage: window.sessionStorage
});
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [VuexPersistStorage.plugin],
  state: {}, //تعريف البيانات
  mutations: {}, // اسناد القيم على البيانات [state]
  actions: {}, // اضافة دوال لاستخدامها على مستوى ال vuex
  getters: {}, // computed vuex => استرجاع قيم ال state
  modules: {
    users,
    profile
  }
});
