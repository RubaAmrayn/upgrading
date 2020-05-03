<template>
  <div>
    <poster-image :course="course"></poster-image>
    <edit-course-form method="update" :course="course"></edit-course-form>

    <delete-course :course="course"></delete-course>
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
  props: ["course"]
};
</script>
