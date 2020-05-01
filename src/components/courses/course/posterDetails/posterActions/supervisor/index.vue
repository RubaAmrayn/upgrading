<template>
  <div>
    <v-col cols="3">
      <briefcase-view></briefcase-view>
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
  }
};
</script>
