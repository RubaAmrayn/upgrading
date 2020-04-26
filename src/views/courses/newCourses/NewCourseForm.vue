<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="7" xl="5">
        <course-form method="add"></course-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "new-course-form",
  components: {
    "course-form": () => import("@/components/courses/course/courseForm")
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
