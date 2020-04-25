<template>
  <v-card>
    <v-img
      lazy-src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="250px"
      dark
    >
      <v-row class="fill-height">
        <v-col cols="12">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn dark icon>
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
    <v-subheader>الوصف</v-subheader>
    <div class="subtitle-1 px-3 descriptionText">
      {{ course.course_description }}
    </div>
    <v-list two-line>
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

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>aliconnors@example.com</v-list-item-title>
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>ali_connors@example.com</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-map-marker</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import { formateDate } from "@/mixins/date";
export default {
  name: "course",
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
