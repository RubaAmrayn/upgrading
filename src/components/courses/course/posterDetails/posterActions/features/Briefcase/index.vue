<template>
  <v-dialog width="500" transition="scroll-y-transition" v-model="openDialog">
    <template v-slot:activator="{ on }">
      <v-btn depressed color="primary" v-on="on">
        <span>الحقيبة</span>
        <v-icon small class="mx-2">mdi-briefcase-outline</v-icon>
      </v-btn>
    </template>
    <course-briefcase v-if="openDialog"></course-briefcase>
  </v-dialog>
</template>

<script>
export default {
  name: "briefcase",
  components: {
    "course-briefcase": () =>
      import("@/components/courses/course/courseBriefcase")
  },
  inject: ["course"],
  data() {
    return {
      openDialog: false
    };
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
