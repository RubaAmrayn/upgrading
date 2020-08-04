<template>
  <v-row class="px-1" v-if="getActiveCourses.length > 0">
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="4"
      xl="4"
      v-for="(course, i) in getActiveCourses"
      :key="i"
      ><course :course="course" :key="`course-${i}`" />
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <v-card>
        <v-card-title class="primary-title justify-center">
          {{ noCourses }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "review-course",
  components: {
    course: () => import("@/components/courses/course/")
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getActiveCourses"])
  },
  methods: {
    loadActiveCourses() {
      this.$store.dispatch("getActiveCourses");
    }
  },
  mounted() {
    this.loadActiveCourses();
  }
};
</script>

<style></style>
