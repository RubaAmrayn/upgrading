<template>
  <v-card>
    <v-img
      lazy-src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="180"
      dark
    >
      <v-row class="fill-height">
        <v-col cols="12">
          <v-card-title>
            <v-spacer></v-spacer>
            <edit-course-form
              method="update"
              :course="course"
            ></edit-course-form>

            <v-btn dark icon @click="deleteCourse">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-card-title>
        </v-col>
        <v-col cols="12">
          <v-card-title class="white--text justify-center">
            <div class="display-1 text-center">
              {{ course.course_name }}
            </div>
          </v-card-title>
        </v-col>
      </v-row>
    </v-img>
    <v-card flat>
      <v-card-title class="primary-title font-weight-bold pb-2">
        الوصف
      </v-card-title>
      <v-card-text class="pt-2">
        <v-card
          flat
          class="descriptionText subtitle-2 font-weight-medium"
          v-text="course.course_description"
        ></v-card>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ formateDate(course.start_date) }} -
              {{ formateDate(course.end_date) }}</v-list-item-title
            >
            <v-list-item-subtitle
              >تاريخ بداية و نهاية الدورة</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="course.daily_hours"> </v-list-item-title>
            <v-list-item-subtitle>الموعد</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-cash-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="course.course_price"></v-list-item-title>
            <v-list-item-subtitle>سعر الدورة</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-seat-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="course.seats_number"></v-list-item-title>
            <v-list-item-subtitle>عدد المقاعد</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <section v-if="course.course_requirements.length > 0">
          <v-divider inset></v-divider>
          <v-card flat>
            <v-card-title class="primary-title font-weight-bold pb-2">
              متطلبات الدورة
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
              لايوجد متطلبات
            </v-card-title>
          </v-card>
        </section>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import { formateDate } from "@/mixins/date";
export default {
  name: "course",
  components: {
    "edit-course-form": () => import("./editCourseForm")
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
    course_requirements() {
      let arr = this.course.course_requirements;
      if (arr.length <= 3) {
        return arr;
      } else {
        return arr.filter((item, index) => index < 3);
      }
    }
  },
  methods: {
    deleteCourse() {
      let self = this;
      this.$root.$emit("show-alert", {
        status: "confirm",
        title: "تنبيه",
        body: "هل انت متأكد من حذف الدورة",
        confirmButtonText: "موافق",
        rejectButtonText: "الغاء",
        data: self.course.course_id,
        action: "deleteOneCourse",
        onSuccess() {
          self.$root.$emit("show-alert", {
            status: "success",
            title: "تم الحذف",
            body: "تم حذف الدورة التدريبة بنجاح "
          });
        }
      });
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
</style>
