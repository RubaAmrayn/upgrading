<template>
  <v-card-actions class="pa-0">
    <v-container class="py-0">
      <v-row justify="space-around">
        <poster-actions></poster-actions>
      </v-row>
    </v-container>
  </v-card-actions>
</template>

<script>
export default {
  name: "poster-details-actions",
  components: {
    "poster-actions": () =>
      import("@/components/courses/course/posterDetails/posterActions")
  },
  inject: ["course"],
  data() {
    return {};
  }
};
</script>
