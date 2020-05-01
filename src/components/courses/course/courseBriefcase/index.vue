<template>
  <v-card>
    <v-card-title class="primary-title justify-center">
      الحقيبة
    </v-card-title>
    <v-card-text>
      <div v-if="getUser.user_id == course.user_id && isTrainer">
        <briefcase-form v-if="getBriefcases.length == 0"></briefcase-form>
        <briefcase-list v-else></briefcase-list>
      </div>
      <div v-else>
        <briefcase-list></briefcase-list>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-container grid-list-xs>
        <v-row justify="space-between">
          <v-col cols="4">
            <v-btn block color="error" dark depressed>رفض</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn block color="secondary" dark depressed>تعليق</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn block color="primary" dark depressed>موافقه</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
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
    ...mapGetters(["getBriefcases", "getUser", "isTrainer"])
  },
  created() {
    this.$store.dispatch("getOneCourseBriefcases", this.course.course_id);
  }
};
</script>
