<template>
  <v-img :src="posterPath" aspect-ratio="2.12" contain dark>
    <v-overlay
      absolute
      opacity="0.4"
      :value="true"
      style="width:100%; height:100%;"
    >
      <v-row class="fill-height">
        <v-col cols="12" class="pt-1">
          <v-card-title class="pt-0 px-1">
            <v-spacer></v-spacer>
            <poster-image></poster-image>
            <edit-course-form
              method="update"
              :course="course"
            ></edit-course-form>

            <delete-course :course_id="course.course_id"></delete-course>
          </v-card-title>
        </v-col>
        <v-col cols="12" class="pb-0" style="align-self: flex-end;">
          <v-card-title class="white--text px-0 pb-0">
            <v-btn
              color="secondary"
              depressed
              style="opacity: 0.8; pointer-events: none; mr-auto; border-top-right-radius: 0px;
    border-bottom-right-radius: 0px; border-bottom-left-radius: 0px;"
            >
              {{ course.course_name }}
            </v-btn>
          </v-card-title>
        </v-col>
      </v-row>
    </v-overlay>
  </v-img>
</template>

<script>
export default {
  name: "poster-title",
  // props: ["course"],
  inject: ["course"],
  components: {
    "edit-course-form": () =>
      import("@/components/courses/course/editCourseForm"),
    "delete-course": () => import("@/components/courses/course/deleteCourse"),
    "poster-image": () => import("./posterImage")
  },
  computed: {
    posterPath() {
      if (this.course && this.course.poster_path) {
        return "/public/" + this.course.poster_path;
      } else {
        return require("@/assets/upgrad.jpg");
      }
    }
  }
};
</script>

<style></style>
