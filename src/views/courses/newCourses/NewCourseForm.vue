<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="6" lg="6" xl="5">
      <v-card>
        <v-card-title class="primary-title justify-center">
          رفع دورة جديدة
        </v-card-title>
        <v-card-text>
          <v-form ref="AddCourseForm">
            <v-text-field
              label="اسم الدورة"
              outlined
              required
              :rules="[v => !!v || 'يجب كتابة عنوان الدورة']"
              v-model.trim="newCourse.course_name"
            ></v-text-field>
            <v-textarea
              label="وصف الدورة"
              outlined
              rows="3"
              auto-grow
              required
              :rules="[v => !!v || 'يحب كتابة وصف الدورة']"
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
                      (!!v && v.split(' حتى ').length === 2) ||
                      courseDateTowError
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
              label="سعر الدورة"
              outlined
              required
              :rules="[v => !!v || 'يجب تحديد سعر الدورة']"
              v-model="newCourse.course_price"
              type="number"
            ></v-text-field>
            <v-text-field
              label="عدد الساعات اليومية"
              outlined
              required
              :rules="[v => !!v || 'يجب كتابة عدد الساعات اليومية']"
              v-model.trim="newCourse.daily_hours"
            ></v-text-field>
            <v-text-field
              label="عدد المقاعد"
              outlined
              required
              :rules="[v => !!v || 'يجب كتابة عدد المقاعد']"
              v-model.trim="newCourse.seats_number"
            ></v-text-field>
            <v-text-field
              v-model="requirement_name"
              label="ماهي متطلبات الدورة؟"
              outlined
              @keydown.enter="append"
            >
            </v-text-field>
            <v-divider class="mb-4"></v-divider>
            <v-card v-if="newCourse.course_requirements.length > 0">
              <v-card-title class="primary-title justify-center">
                قائمة متطلبات الدورة
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
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6" xl="4">
              <v-btn color="primary" depressed block @click="addNewCourse">
                رفع الطلب
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "new-course-form",
  data() {
    return {
      menu: false,
      id: 1,
      requirement_name: "",
      newCourse: {
        course_name: "",
        daily_hours: "",
        course_dates: [],
        course_description: "",
        course_price: "",
        seats_number: "",
        course_requirements: []
      }
    };
  },
  computed: {
    courseDate() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.courseDate");
    },
    courseDateError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.courseDateError");
    },
    courseDateTowError() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.courseDateTowError");
    },
    dateRangeText() {
      return this.newCourse.course_dates.join(" حتى ");
    }
  },
  methods: {
    append() {
      this.newCourse.course_requirements.push({
        id: this.id,
        requirement_name: this.requirement_name
      });
      this.requirement_name = "";
      this.id++;
    },
    removeItem(id) {
      this.newCourse.course_requirements = this.newCourse.course_requirements.filter(
        requirement => requirement.id != id
      );
    },
    addNewCourse() {
      this.$store.dispatch("addNewCourse", this.newCourse).then(() => {
        this.$root.$emit("show-alert", {
          status: "success",
          title: "تمت الإضافة",
          body: "تمت إضافة الدورة بنجاح وفي انتظار اجراء المسؤول فيها"
        });
      });
    }
  }
};
</script>
