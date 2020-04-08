<template>
  <div>
    <v-card
      v-if="getExperinces.length == 0"
      class="pa-3 mb-1"
      style="border-right: 3px solid var(--v-info-base)"
      flat
    >
      <div class="title text-center">
        {{ experNo }}
      </div>
    </v-card>
    <v-card
      v-else
      v-for="(experience, i) in getExperinces"
      :key="i"
      flat
      shaped
      class="pa-2 mb-1"
      style="border-right: 3px solid var(--v-primary-base)"
    >
      <template>
        <v-row justify="center" class="px-2">
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              {{ experience }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.experince_name }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title center-text">
              {{ experStart }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ new Date(experience.start_date).toLocaleDateString("en-sa") }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title center-text">
              {{ experEnd }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ new Date(experience.end_date).toLocaleDateString("en-sa") }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              {{ experType }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.ar_experince_type }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              {{ experLevel }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.ar_exp_level }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              {{ qualificationEvents }}
            </div>
            <div class="subtitle-1 justify-center">
              <v-btn icon>
                <v-icon>mdi-pencil-circle-outline</v-icon>
              </v-btn>
              <v-btn icon @click="deleteQualification(experience.experince_id)">
                <v-icon>mdi-delete-circle-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-folder-outline</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "experience-list",
  data() {
    return {};
  },
  computed: {
    experNo() {
      return this.$vuetify.lang.t("$vuetify.Experience.experNo");
    },
    experience() {
      return this.$vuetify.lang.t("$vuetify.Experience.experience");
    },
    experStart() {
      return this.$vuetify.lang.t("$vuetify.Experience.experStart");
    },
    experEnd() {
      return this.$vuetify.lang.t("$vuetify.Experience.experEnd");
    },
    experType() {
      return this.$vuetify.lang.t("$vuetify.Experience.experType");
    },
    experLevel() {
      return this.$vuetify.lang.t("$vuetify.Experience.experLevel");
    },
    qualificationEvents() {
      return this.$vuetify.lang.t("$vuetify.Educational.qualificationEvents");
    },
    ...mapGetters(["getExperinces"])
  },
  methods: {
    deleteExperince() {
      return;
    }
  },
  mounted() {
    this.$store.dispatch("getOneUserExperience");
  }
};
</script>
