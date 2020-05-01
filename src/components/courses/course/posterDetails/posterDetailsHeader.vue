<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ course.course_name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$root.$emit('close-dialog')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- <v-card-title class="primary-title font-weight-bold justify-center">
      <div></div>
    </v-card-title> -->
    <v-card-subtitle>
      تاريخ الرفع {{ formateDate(course.publish_date) }}
    </v-card-subtitle>
  </div>
</template>

<script>
import { formateDate } from "@/mixins/date";
export default {
  name: "poster-details-header",
  inject: ["course"],
  mixins: [formateDate]
};
</script>
