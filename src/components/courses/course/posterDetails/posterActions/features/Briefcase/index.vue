<template>
  <v-dialog width="500" transition="scroll-y-transition" v-model="openDialog">
    <template v-slot:activator="{ on }">
      <v-btn depressed color="primary" v-on="on">
        <span>{{ briefcase }}</span>
        <v-icon small class="mx-2">mdi-briefcase-outline</v-icon>
      </v-btn>
    </template>
    <course-briefcase :course="course" v-if="openDialog"></course-briefcase>
  </v-dialog>
</template>

<script>
export default {
  name: "briefcase",
  components: {
    "course-briefcase": () =>
      import("@/components/courses/course/courseBriefcase")
  },
  props: ["course"],
  data() {
    return {
      openDialog: false
    };
  },
  computed: {
    briefcase() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.briefcase");
    }
  },
  mounted() {
    this.$root.$on("close-briefcase", () => (this.openDialog = false));
  },
  destroyed() {
    this.$root.$off("close-briefcase");
  }
};
</script>

<style></style>
