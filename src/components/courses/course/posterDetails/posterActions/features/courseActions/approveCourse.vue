<template>
  <v-btn
    block
    depressed
    color="success"
    dark
    :loading="connectionState"
    @click="approveCourse"
  >
    {{ approveCourses }}
    <v-icon class="px-1">mdi-check</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "approve-course",
  props: ["course"],
  data() {
    return {
      connectionState: false
    };
  },
  computed: {
    approveCourses() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.approveCourses");
    },
    approveCourseTitle() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.approveCourseTitle");
    },
    approveCourseBody() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.approveCourseBody");
    }
  },
  methods: {
    approveCourse() {
      this.connectionState = true;
      let data = {
        course_id: this.course.course_id
      };
      this.$store.dispatch("ApproveCourse", data).then(res => {
        if (res == "Approved") {
          this.$root.$emit("show-alert", {
            status: "success",
            title: this.approveCourseTitle,
            body: this.approveCourseBody
          });
        }
      });
    }
  }
};
</script>

<style></style>
