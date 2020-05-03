<template>
  <div>
    <v-row v-if="course.current_status == 1">
      <v-col cols="12" sm="4" md="4" lg="3">
        <reject-course :course="course"></reject-course>
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="3">
        <hold-course :course="course"></hold-course>
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="3">
        <approve-course :course="course"></approve-course>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" md="4" lg="3" v-if="course.current_status >= 4">
        <briefcase-view :course="course"></briefcase-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "supervisor-actions",
  props: ["course"],
  components: {
    "briefcase-view": () =>
      import(
        "@/components/courses/course/posterDetails/posterActions/features/Briefcase"
      ),
    "reject-course": () =>
      import(
        "@/components/courses/course/posterDetails/posterActions/features/courseActions/rejectCourse"
      ),
    "hold-course": () =>
      import(
        "@/components/courses/course/posterDetails/posterActions/features/courseActions/holdCourse"
      ),
    "approve-course": () =>
      import(
        "@/components/courses/course/posterDetails/posterActions/features/courseActions/approveCourse"
      )
  }
};
</script>
