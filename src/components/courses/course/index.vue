<template>
  <v-card style="border-radius: 6px">
    <v-img :src="img" height="180" dark>
      <v-overlay
        absolute
        opacity="0.4"
        :value="true"
        style="width:100%; height:100%;"
      >
        <v-row class="fill-height">
          <v-col cols="12" class="pt-1">
            <v-card-title class="pt-0 px-1">
              <v-spacer></v-spacer>
              <edit-course-form
                method="update"
                :course="course"
              ></edit-course-form>

              <delete-course :course_id="course.course_id"></delete-course>
            </v-card-title>
          </v-col>
          <v-col cols="12" class="pb-0" style="align-self: flex-end;">
            <v-card-title class="white--text px-0 pb-0">
              <v-btn
                color="secondary"
                depressed
                style="opacity: 0.8; pointer-events: none; mr-auto; border-top-right-radius: 0px;
    border-bottom-right-radius: 0px; border-bottom-left-radius: 0px;"
              >
                {{ course.course_name }}
              </v-btn>
            </v-card-title>
          </v-col>
        </v-row>
      </v-overlay>
    </v-img>
    <!-- <v-card flat>
      <v-card-title class="primary-title font-weight-bold pb-2 pt-2">
        {{ description }}
      </v-card-title>
      <v-card-text class="pt-2">
        <v-card
          flat
          class="descriptionText subtitle-2 font-weight-medium"
          v-text="course.course_description"
        ></v-card>
      </v-card-text>
    </v-card> -->
    <v-divider></v-divider>
    <v-list>
      <!-- <v-list-item-group> -->
      <v-list-item selectable>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-account</v-icon>
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
          <v-icon color="indigo">mdi-calendar</v-icon>
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
          <v-icon color="indigo">mdi-clock-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="course.daily_hours"> </v-list-item-title>
          <v-list-item-subtitle>{{ appointment }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="course.course_price"></v-list-item-title>
          <v-list-item-subtitle>{{ priceCourse }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!--  <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-seat-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="course.seats_number"></v-list-item-title>
            <v-list-item-subtitle>{{ numberOfSeats }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <section v-if="course.course_requirements.length > 0">
          <v-divider inset></v-divider>
          <v-card flat>
            <v-card-title class="primary-title font-weight-bold pb-2">
              {{ requstCourse }}
            </v-card-title>
            <v-list-item
              v-for="({ requirement_name }, i) in course_requirements"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon color="indigo">mdi-checkbox-marked-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-text="requirement_name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </section>
        <section v-else>
          <v-card flat>
            <v-card-title class="primary-title font-weight-bold pb-2">
              {{ noRequirement }}
            </v-card-title>
          </v-card>
        </section> -->
      <!-- </v-list-item-group> -->
    </v-list>
  </v-card>
</template>
<script>
import { formateDate } from "@/mixins/date";
export default {
  name: "course",
  components: {
    "edit-course-form": () => import("./editCourseForm"),
    "delete-course": () => import("./deleteCourse")
  },
  mixins: [formateDate],
  props: {
    poster: {
      type: Object,
      required: false
    },
    course: {
      type: Object,
      required: false
    }
  },
  computed: {
    img() {
      return require("@/assets/upgrad.jpg");
    },
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
.descriptionText {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.v-overlay__content {
  height: 100%;
  width: 100%;
}
</style>
