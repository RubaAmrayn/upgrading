<template>
  <div>
    <course-poster></course-poster>
  </div>
</template>

<script>
export default {
  // we will replace course poster with course-list after fill it with course-poster
  name: "pinding-courses",
  components: {
    "course-poster": () => import("../../../components/courses/course/index")
  }
};
</script>
