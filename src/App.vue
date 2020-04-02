<template>
  <v-app>
    <!-- <navigation-view></navigation-view> -->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- <footer-view></footer-view> -->
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    // "navigation-view": () =>
    //   import("./components/main/navigationComponents/index"),
    // "footer-view": () => import("./components/main/footerComponents/index")
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
