<template>
  <div>
    <v-row justify="start" v-if="isTrainer">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-alert
          type="error"
          border="top"
          colored-border
          v-if="getLastStatus == 3"
        >
          <v-row justify="space-between">
            <v-col cols="10">
              {{ getStatus[0].notes }}
            </v-col>
            <v-col cols="2">
              <request-btn></request-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert
          type="secondary"
          border="top"
          colored-border
          v-else-if="getLastStatus == 2"
        >
          <v-row justify="space-between">
            <v-col cols="10">
              {{ getStatus[0].notes }}
            </v-col>
            <v-col cols="2">
              <request-btn></request-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert type="info" border="top" colored-border v-else>
          <v-row justify="space-between">
            <v-col cols="10">
              {{ addAlert }}
            </v-col>
            <v-col cols="2">
              <request-btn></request-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>{{ eduTitle }}</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon class="text-start">mdi-account</v-icon>
          <span class="text-end">
            {{ infoPerson }}
          </span>
        </v-tab>
        <v-tab>
          <v-icon class="text-start">mdi-lock</v-icon>
          <span class="text-end">
            {{ qualifications }}
          </span>
        </v-tab>
        <v-tab>
          <v-icon class="text-start">mdi-card-account-details</v-icon>
          <span class="text-end">
            {{ experiencePersonal }}
          </span>
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- user information -->
              <info-person></info-person>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <!-- educational qualification card -->
          <educational-qualification></educational-qualification>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- experinces card -->
              <experience></experience>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
// import profile from "@/store/profile";
import requestBtn from "./requestBtn";
import { mapGetters } from "vuex";
export default {
  name: "profile-view",
  components: {
    "request-btn": requestBtn,
    "info-person": () => import("./infoPerson"),
    "educational-qualification": () => import("./educationalQualification"),
    experience: () => import("./experience")
  },
  computed: {
    ...mapGetters(["isTrainer", "getStatus", "getLastStatus"]),
    addAlert() {
      return this.$vuetify.lang.t("$vuetify.Educational.addAlert");
    },
    eduTitle() {
      return this.$vuetify.lang.t("$vuetify.Info.eduTitle");
    },
    infoPerson() {
      return this.$vuetify.lang.t("$vuetify.Info.infoPerson");
    },
    qualifications() {
      return this.$vuetify.lang.t("$vuetify.Info.qualifications");
    },
    experiencePersonal() {
      return this.$vuetify.lang.t("$vuetify.Info.experiencePersonal");
    }
  }
  // created() {
  //   this.$store.registerModule("profile", profile);
  // },
  // destroyed() {
  //   this.$store.unregisterModule("profile");
  // }
};
</script>
