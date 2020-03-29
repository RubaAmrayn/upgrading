import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import ar from "../i18nLocalization/AR/index";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        pramiry: "#2967B4",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  icons: {
    iconfont: "mdi",
    values: {
      edit: "mdi-circle-edit-outline",
      complete: "mdi-checkbox-marked-circle-outline"
    }
  },
  rtl: true,
  lang: {
    locales: {
      ar
    },
    current: "ar"
  }
});
