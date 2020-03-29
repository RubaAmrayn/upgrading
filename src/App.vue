<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
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
