<template>
  <v-card>
    <v-card-title class="primary-title justify-center">
      <v-row justify="center">
        <v-col cols="4"></v-col>
        <v-col cols="4" style="text-align: center">
          <span>
            الحقيبة
          </span>
        </v-col>
        <v-col cols="4" style="text-align: end">
          <v-btn icon @click="$root.$emit('close-briefcase')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
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
    <div v-if="getBriefcases.length > 0">
      <trainer-actions
        v-if="getUser.user_id == course.user_id && isTrainer"
      ></trainer-actions>
      <supervisor-actions v-else-if="isSuperVisor"></supervisor-actions>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "course-briefcase",
  inject: ["course"],
  components: {
    "briefcase-form": () => import("./briefcaseForm"),
    "briefcase-list": () => import("./briefcaseList"),
    "trainer-actions": () => import("./briefcaseActions/trainer/index"),
    "supervisor-actions": () => import("./briefcaseActions/supervisor/index")
  },
  computed: {
    ...mapGetters(["getBriefcases", "getUser", "isTrainer", "isSuperVisor"])
  },
  created() {
    this.$store.dispatch("getOneCourseBriefcases", this.course.course_id);
  }
};
</script>
