<template>
  <div>
    <poster-image></poster-image>
    <edit-course-form method="update" :course="course"></edit-course-form>

    <delete-course :course_id="course.course_id"></delete-course>
  </div>
</template>

<script>
export default {
  name: "poster-actions",
  components: {
    "edit-course-form": () =>
      import("@/components/courses/course/posterActions/editCourseForm"),
    "delete-course": () =>
      import("@/components/courses/course/posterActions/deleteCourse"),
    "poster-image": () =>
      import("@/components/courses/course/posterActions/posterImage")
  },
  inject: ["course"]
};
</script>
