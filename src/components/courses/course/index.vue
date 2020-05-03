<template>
  <div>
    <v-dialog
      min-width="400"
      max-width="600"
      max-height="600"
      transition="scroll-y-transition"
      v-model="posterDialog"
    >
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <course-poster :course="course"></course-poster>
        </div>
      </template>
      <poster-details :course="course" v-if="posterDialog"></poster-details>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "course",
  components: {
    "course-poster": () => import("@/components/courses/course/coursePoster"),
    "poster-details": () => ({
      component: import("@/components/courses/course/posterDetails"),
      timeout: 3000
    })
  },
  data() {
    return {
      localCourse: this.course,
      posterDialog: false
    };
  },
  props: {
    course: {
      type: Object,
      required: false
    }
  },
  mounted() {
    this.$root.$on("close-dialog", () => (this.posterDialog = false));
  },
  beforeDestroy() {
    this.$root.$off("close-dialog");
  }
};
</script>
<style>
.descriptionText {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.v-overlay__content {
  height: 100%;
  width: 100%;
}
</style>
