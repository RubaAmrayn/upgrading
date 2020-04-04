<template>
  <v-app-bar app elevate-on-scroll>
    <v-app-bar-nav-icon
      @click="$root.$emit('navigationDrawer')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="title d-none d-sm-flex and-down">{{
      PageTitle
    }}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-teach</v-icon>
        </v-btn>
      </template>
      <span class="body-2">
        إلتحاق كمدرب
      </span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
      </template>
      <span class="body-2">
        الملف الشخصي
      </span>
    </v-tooltip>
    <v-expand-x-transition>
      <v-card v-show="showSearch" width="200" class="mx-auto" flat>
        <v-text-field single-line outlined dense hide-details label="بحث">
        </v-text-field>
      </v-card>
    </v-expand-x-transition>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="showSearch = !showSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      <span class="body-2">
        بحث عن دورة
      </span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="LOG_OUT">
          <v-icon>mdi-power-standby</v-icon>
        </v-btn>
      </template>
      <span class="body-2">
        تسجيل خروج
      </span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-bar",
  data() {
    return {
      showSearch: false
    };
  },
  computed: {
    PageTitle() {
      return this.$route.meta.title;
    }
  },
  methods: {
    LOG_OUT() {
      this.$store.dispatch("logOut").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style></style>
