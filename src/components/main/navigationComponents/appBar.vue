<template>
  <v-app-bar app elevate-on-scroll>
    <v-app-bar-nav-icon
      @click="$root.$emit('navigationDrawer')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>Page Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-bar",
  data() {
    return {};
  }
};
</script>

<style></style>
