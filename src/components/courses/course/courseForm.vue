<template>
  <v-card :loading="connectionState" :disabled="connectionState">
    <v-card-title class="primary-title justify-center">
      {{ method == "add" ? uplodedCourse : editCourse }}
    </v-card-title>
    <v-card-text>
      <v-form ref="AddCourseForm">
        <v-text-field
          :label="nameCourse"
          outlined
          required
          :rules="[v => !!v || nameCourseError]"
          v-model.trim="newCourse.course_name"
        ></v-text-field>
        <v-textarea
          :label="describeCourse"
          outlined
          rows="3"
          auto-grow
          required
          :rules="[v => !!v || describeCourseError]"
          v-model="newCourse.course_description"
        >
        </v-textarea>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateRangeText"
              prepend-inner-icon="mdi-calendar-range"
              :label="courseDate"
              required
              :rules="[
                v => !!v || courseDateError,
                v =>
                  (!!v && v.split(' حتى ').length === 2) || courseDateTowError
              ]"
              outlined
              v-on="on"
              readonly
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="newCourse.course_dates"
            ref="picker"
            @input="menu = false"
            range
            year-icon="mdi-calendar-outline"
            show-current
          ></v-date-picker>
        </v-menu>
        <v-text-field
          :label="priceCourse"
          outlined
          required
          :rules="[v => !!v || priceCourseError]"
          v-model="newCourse.course_price"
          type="number"
        ></v-text-field>
        <!--  -->
        <v-menu
          ref="startTime"
          v-model="startTimeMenu"
          :close-on-content-click="false"
          :return-value.sync="newCourse.daily_hours.startTime"
          transition="scale-transition"
          top
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :label="startTime"
              outlined
              required
              :rules="[v => !!v || numberOfHoursError]"
              v-model="newCourse.daily_hours.startTime"
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-time-picker
            ampm-in-title
            v-if="startTimeMenu"
            v-model="newCourse.daily_hours.startTime"
            full-width
            :max="newCourse.daily_hours.endTime"
            @click:minute="
              $refs.startTime.save(newCourse.daily_hours.startTime)
            "
          ></v-time-picker>
        </v-menu>
        <v-menu
          ref="endTime"
          v-model="endTimeMenu"
          :close-on-content-click="false"
          :return-value.sync="newCourse.daily_hours.endTime"
          transition="scale-transition"
          top
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :label="endTime"
              outlined
              required
              :rules="[v => !!v || numberOfHoursError]"
              v-model="newCourse.daily_hours.endTime"
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-time-picker
            ampm-in-title
            v-if="endTimeMenu"
            v-model="newCourse.daily_hours.endTime"
            full-width
            :disabled="newCourse.daily_hours.startTime == undefined"
            :min="newCourse.daily_hours.startTime"
            @click:minute="$refs.endTime.save(newCourse.daily_hours.endTime)"
          ></v-time-picker>
        </v-menu>
        <!--  -->
        <v-text-field
          :label="numberOfSeats"
          outlined
          required
          :rules="[v => !!v || numberOfSeatError]"
          v-model.trim="newCourse.seats_number"
        ></v-text-field>
        <v-text-field
          v-model="requirement_name"
          :label="listOfCourseRequirements"
          outlined
          @keydown.enter="append"
          validate-on-blur
        >
        </v-text-field>
        <v-divider class="mb-4"></v-divider>
        <v-card v-if="newCourse.course_requirements.length > 0">
          <v-card-title class="primary-title justify-center">
            {{ listOfCourseRequirement }}
          </v-card-title>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(requirement, i) in newCourse.course_requirements"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon color="error" @click="removeItem(requirement.id)"
                    >mdi-minus-circle-outline</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="requirement.requirement_name"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-container fluid class="py-0">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="4">
            <v-btn
              color="primary"
              depressed
              block
              @click="addNewCourse"
              :loading="connectionState"
              v-if="method == 'add'"
            >
              {{ uplodeCourse }}
            </v-btn>
            <v-btn
              color="primary"
              depressed
              block
              @click="updateCourse"
              :loading="connectionState"
              v-else-if="method == 'update'"
            >
              {{ editRequst }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { formatDate } from "@/mixins/date";
export default {
  name: "course-form",
  props: {
    method: {
      type: String,
      required: true
    },
    course: {
      type: Object,
      required: false
    }
  },
  mixins: [formatDate],
  data() {
    return {
      connectionState: false,
      menu: false,
      startTimeMenu: false,
      endTimeMenu: false,
      id: 1,
      requirement_name: "",
      newCourse: {
        course_name: "",
        daily_hours: {
          startTime: undefined,
          endTime: undefined
        },
        course_dates: [],
        course_description: "",
        course_price: "",
        seats_number: "",
        course_requirements: []
      }
    };
  },
  computed: {
    uplodedCourse() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.uplodedCourse");
    },
    nameCourse() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.nameCourse");
    },
    nameCourseError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.nameCourseError");
    },
    describeCourse() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.describeCourse");
    },
    describeCourseError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.describeCourseError");
    },
    courseDate() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.courseDate");
    },
    courseDateError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.courseDateError");
    },
    courseDateTowError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.courseDateTowError");
    },
    priceCourse() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.priceCourse");
    },
    priceCourseError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.priceCourseError");
    },
    numberOfHours() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.numberOfHours");
    },
    numberOfHoursError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.numberOfHoursError");
    },
    numberOfSeats() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.numberOfSeats");
    },
    numberOfSeatError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.numberOfSeatError");
    },
    listOfCourseRequirements() {
      return this.$vuetify.lang.t(
        "$vuetify.newCourseForm.listOfCourseRequirements"
      );
    },
    courseRequirementError() {
      return this.$vuetify.lang.t(
        "$vuetify.newCourseForm.courseRequirementError"
      );
    },
    listOfCourseRequirement() {
      return this.$vuetify.lang.t(
        "$vuetify.newCourseForm.listOfCourseRequirement"
      );
    },
    uplodeCourse() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.uplodeCourse");
    },
    editCourse() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.editCourse");
    },
    startTime() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.startTime");
    },
    endTime() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.endTime");
    },
    editRequst() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.editRequst");
    },
    dateRangeText() {
      return this.newCourse.course_dates.join(" حتى ");
    }
  },
  methods: {
    append() {
      this.newCourse.course_requirements.push({
        id: this.id++,
        requirement_name: this.requirement_name
      });
      this.requirement_name = "";
    },
    removeItem(id) {
      this.newCourse.course_requirements = this.newCourse.course_requirements.filter(
        requirement => requirement.id != id
      );
    },
    addNewCourse() {
      if (this.$refs.AddCourseForm.validate()) {
        this.connectionState = true;
        this.$store.dispatch("addNewCourse", this.newCourse).then(() => {
          this.connectionState = false;
          this.$root.$emit("show-alert", {
            status: "success",
            title: "تمت الإضافة",
            body: "تمت إضافة الدورة بنجاح وفي انتظار اجراء المسؤول فيها"
          });
        });
      }
      this.$refs.AddCourseForm.reset();
      let self = this;
      setTimeout(function() {
        self.$router.push("/courses/newCourses/pinding");
      }, 3000);
    },
    updateCourse() {
      // if (this.$refs.AddCourseForm.validate()) {
      // }
    }
  },
  mounted() {
    if (this.method == "update") {
      this.newCourse["course_name"] = this.course["course_name"];
      this.newCourse["course_description"] = this.course["course_description"];
      this.newCourse["course_dates"] = [
        this.Formater(this.course["start_date"]),
        this.Formater(this.course["end_date"])
      ];
      this.newCourse["course_price"] = this.course["course_price"];
      let daily_hours = this.course["daily_hours"].split("-");
      this.newCourse["daily_hours"]["startTime"] = daily_hours[1];
      this.newCourse["daily_hours"]["endTime"] = daily_hours[0];
      this.newCourse["seats_number"] = this.course["seats_number"];
      if (this.course["course_requirements"].length > 0) {
        var innerId = 0;
        this.course["course_requirements"].forEach(requirement => {
          this.newCourse.course_requirements.push({
            id: innerId++,
            requirement_id: requirement["requirement_id"],
            requirement_name: requirement["requirement_name"]
          });
        });
        this.id = innerId;
      }
    }
  }
};
</script>
