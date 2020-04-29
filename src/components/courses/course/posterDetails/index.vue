<template>
  <v-card>
    <poster-details-header></poster-details-header>
    <poster-details-body></poster-details-body>
    <poster-details-actions></poster-details-actions>
  </v-card>
</template>

<script>
export default {
  name: "poster-details",
  components: {
    "poster-details-header": () => import("./posterDetailsHeader"),
    "poster-details-body": () => import("./posterDetailsBody"),
    "poster-details-actions": () => import("./posterDetailsActions")
  }
};
</script>
