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
            {{ noCourses }}
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
    noCourses() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.noCourses");
    },
    ...mapGetters(["getNewCourses", "isTrainer", "isSuperVisor"])
  },
  methods: {
    LoadCourses() {
      if (this.isTrainer) {
        this.$store.dispatch("getOneNewCourses");
      } else if (this.isSuperVisor) {
        this.$store.dispatch("getAllNewCourses");
      }
    }
  },
  mounted() {
    this.LoadCourses();
  }
};
</script>
