<template>
  <div>
    <v-btn
      :color="statusColors(course.current_status)"
      dark
      small
      absolute
      top
      right
      class="no-active"
      v-if="course.current_status != 9"
    >
      <span>{{ course.ar_status_name }}</span>
      <v-icon small class="mx-1"
        >mdi-{{ statusIcons(course.current_status) }}</v-icon
      >
    </v-btn>
    <v-divider></v-divider>
    <v-list>
      <v-list-item selectable>
        <v-list-item-icon>
          <v-icon color="primary">mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ course.first_name }} {{ course.middle_name }}
            {{ course.last_name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ formateDate(course.start_date) }} -
            {{ formateDate(course.end_date) }}</v-list-item-title
          >
          <v-list-item-subtitle>{{ courseDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">mdi-clock-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="course.daily_hours"> </v-list-item-title>
          <v-list-item-subtitle>{{ appointment }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="course.course_price"></v-list-item-title>
          <v-list-item-subtitle>{{ priceCourse }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { formateDate } from "@/mixins/date";
import statusColors from "@/mixins/statusColorsIcons";
export default {
  name: "poster-body",
  props: ["course"],
  mixins: [formateDate, statusColors],
  computed: {
    description() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.description");
    },
    courseDate() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.courseDate");
    },
    appointment() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.appointment");
    },
    requstCourse() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.requstCourse");
    },
    priceCourse() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.priceCourse");
    },
    numberOfSeats() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.numberOfSeats");
    },
    noRequirement() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.noRequirement");
    },
    course_requirements() {
      let arr = this.course.course_requirements;
      if (arr.length <= 3) {
        return arr;
      } else {
        return arr.filter((item, index) => index < 3);
      }
    }
  }
};
</script>

<style>
.no-active {
  top: 10px;
  opacity: 0.9;
  pointer-events: none;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
