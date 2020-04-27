<template>
  <v-app>
    <alert-view v-if="showAlert" :payload="payload"></alert-view>
    <navigation-view v-if="isLoggedIn"></navigation-view>
    <v-content>
      <v-container fluid v-if="isLoggedIn">
        <router-view></router-view>
      </v-container>
      <router-view v-else></router-view>
    </v-content>
    <footer-view v-if="isLoggedIn"></footer-view>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      showAlert: false,
      payload: {}
    };
  },
  components: {
    "alert-view": () => import("@/components/main/alert-view"),
    "navigation-view": () =>
      import("./components/main/navigationComponents/index"),
    "footer-view": () => import("./components/main/footerComponents/index")
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  mounted() {
    this.$root.$on("show-alert", payload => {
      if (payload) {
        this.payload = payload;
        this.showAlert = true;
      }
    });
    this.$root.$on("close-alert", () => {
      this.showAlert = false;
    });
  }
};
</script>
<style>
@font-face {
  font-family: "hanimation-regular";
  font-weight: 400;
  font-style: normal;
  font-display: fallback;
  src: local("hanimation-regular"), url("./assets/hanimation-regular.ttf");
}
</style>
