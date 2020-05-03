<template>
  <v-card-actions class="">
    <v-container class="py-0">
      <poster-actions :course="course"></poster-actions>
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
  props: ["course"],
  data() {
    return {};
  }
};
</script>
