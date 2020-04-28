<template>
  <div>
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
  </div>
</template>

<script>
import { formateDate } from "@/mixins/date";
export default {
  name: "poster-body",
  props: ["course"],
  mixins: [formateDate],
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

<style></style>
