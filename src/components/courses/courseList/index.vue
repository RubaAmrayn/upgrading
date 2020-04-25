<template>
  <div>
    <v-row class="px-1" v-if="getNewCourses.length > 0">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
        v-for="(course, i) in getNewCourses"
        :key="i"
        ><course :course="course" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-card-title class="primary-title justify-center">
            لا يوجد لديك دورات
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "course-list",
  components: {
    course: () => import("@/components/courses/course/")
  },
  computed: {
    ...mapGetters(["getNewCourses"])
  },
  mounted() {
    this.$store.dispatch("getOneNewCourses");
  }
};
</script>
