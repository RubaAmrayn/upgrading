<template>
  <v-app>
    <alert-view v-if="showAlert" :payload="payload"></alert-view>
    <navigation-view></navigation-view>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <footer-view></footer-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showAlert: false,
      payload: {}
    };
  },
  components: {
    "alert-view": () => import("@/components/main/alert"),
    "navigation-view": () =>
      import("./components/main/navigationComponents/index"),
    "footer-view": () => import("./components/main/footerComponents/index")
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
  font-family: "Tajwal";
  font-weight: 400;
  font-style: normal;
  font-display: fallback;
  src: local("Tajwal"), url("./assets/Tajawal-Regular.ttf");
}
* {
  font-family: Tajwal;
}
</style>
