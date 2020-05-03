<template>
  <v-card>
    <poster-details-header :course="course"></poster-details-header>
    <poster-details-body :course="course"></poster-details-body>
    <poster-details-actions :course="course"></poster-details-actions>
  </v-card>
</template>

<script>
export default {
  name: "poster-details",
  props: ["course"],
  components: {
    "poster-details-header": () => import("./posterDetailsHeader"),
    "poster-details-body": () => import("./posterDetailsBody"),
    "poster-details-actions": () => import("./posterDetailsActions")
  }
};
</script>
