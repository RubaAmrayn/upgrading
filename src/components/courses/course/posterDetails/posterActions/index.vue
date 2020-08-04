<template>
  <div>
    <supervisor-actions
      :course="course"
      v-if="isSuperVisor"
    ></supervisor-actions>
    <trainer-actions :course="course" v-else-if="isTrainer"></trainer-actions>
    <trainee-actions :course="course" v-else-if="isTrainee"></trainee-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "poster-details-actions",
  components: {
    "supervisor-actions": () =>
      import(
        "@/components/courses/course/posterDetails/posterActions/supervisor"
      ),
    "trainer-actions": () =>
      import("@/components/courses/course/posterDetails/posterActions/trainer"),
    "trainee-actions": () =>
      import("@/components/courses/course/posterDetails/posterActions/trainee")
  },
  props: ["course"],
  computed: {
    ...mapGetters(["isSuperVisor", "isTrainer", "isTrainee"])
  }
};
</script>
