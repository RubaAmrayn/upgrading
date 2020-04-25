<template>
  <div>
    <course-list></course-list>
  </div>
</template>

<script>
export default {
  // we will replace course poster with course-list after fill it with course-poster
  name: "pinding-courses",
  components: {
    "course-list": () => import("../../../components/courses/courseList")
  }
};
</script>
