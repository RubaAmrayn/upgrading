<template>
  <v-card>
    <v-card-title class="primary-title justify-center">
      الحقيبة
    </v-card-title>
    <v-card-text>
      <briefcase-form v-if="getBriefcases.length == 0"></briefcase-form>
      <briefcase-list v-else></briefcase-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "course-briefcase",
  inject: ["course"],
  components: {
    "briefcase-form": () => import("./briefcaseForm"),
    "briefcase-list": () => import("./briefcaseList")
  },
  computed: {
    ...mapGetters(["getBriefcases"])
  },
  created() {
    this.$store.dispatch("getOneCourseBriefcases", this.course.course_id);
  }
};
</script>
