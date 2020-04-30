<template>
  <div>
    <v-card style="border-radius: 6px">
      <poster-title style="height:180px;"></poster-title>
      <poster-body></poster-body>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "course-poster",
  components: {
    "poster-title": () => import("./posterTitle"),
    "poster-body": () => import("./posterBody")
  }
  // props: ["course"]
};
</script>

<style></style>
