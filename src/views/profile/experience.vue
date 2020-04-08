<template>
  <div>
    <v-card flat>
      <v-card-title class="justify-end">
        <v-dialog
          max-width="650"
          transition="slide-y-transition"
          origin="top bottom"
        >
          <template #activator="{ on }">
            <v-btn color="info" depressed v-on="on">{{ experienceAdd }}</v-btn>
          </template>
          <experience-form></experience-form>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <experience-list></experience-list>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "experience",
  computed: {
    experienceAdd() {
      return this.$vuetify.lang.t("$vuetify.Experience.experienceAdd");
    }
  },
  components: {
    "experience-form": () =>
      import("@/components/profile/experience/experienceForm"),
    "experience-list": () =>
      import("@/components/profile/experience/experienceList")
  },
  data() {
    return {};
  }
};
</script>
