<template>
  <div>
    <supervisor-actions v-if="isSuperVisor"></supervisor-actions>
    <trainer-actions v-else-if="isTrainer"></trainer-actions>
    <trainee-actions v-else-if="isTrainee"></trainee-actions>
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
      import("@/components/courses/course/posterDetails/posterActions/trainer")
  },
  computed: {
    ...mapGetters(["isSuperVisor", "isTrainer", "isTrainee"])
  }
};
</script>
