<template>
  <div>
    <v-col cols="3" v-if="course.current_status >= 4">
      <briefcase-view :course="course"></briefcase-view>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "supervisor-actions",
  components: {
    "briefcase-view": () =>
      import(
        "@/components/courses/course/posterDetails/posterActions/features/Briefcase"
      )
  },
  props: ["course"]
};
</script>
