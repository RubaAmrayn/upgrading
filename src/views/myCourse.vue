<template>
  <v-row class="px-1" v-if="getMyCourse.length > 0">
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="4"
      xl="4"
      v-for="(course, i) in getMyCourse"
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
  name: "my-course",
  components: {
    course: () => import("@/components/courses/course/")
  },
  data() {
    return {};
  },
  computed: {
    noCourses() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.noCourses");
    },
    ...mapGetters(["getMyCourse"])
  },
  methods: {
    loadAproveCourses() {
      this.$store.dispatch("getMyCourse");
    }
  },
  mounted() {
    this.loadAproveCourses();
  }
};
</script>

<style></style>
