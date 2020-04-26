<template>
  <v-dialog
    max-width="650"
    transition="slide-y-transition"
    origin="top bottom"
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <course-form method="update" :course="course"></course-form>
  </v-dialog>
</template>

<script>
export default {
  name: "editCourse-form",
  components: {
    "course-form": () => import("./courseForm")
  },
  props: {
    method: {
      type: String,
      required: true
    },
    course: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style></style>
