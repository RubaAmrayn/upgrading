<template>
  <div>
    <v-card style="border-radius: 6px">
      <poster-title :course="course"></poster-title>
      <poster-body :course="course"></poster-body>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "course-poster",
  components: {
    "poster-title": () => import("./posterTitle"),
    "poster-body": () => import("./posterBody")
  },
  props: ["course"]
};
</script>

<style></style>
