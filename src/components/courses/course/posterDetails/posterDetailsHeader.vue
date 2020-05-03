<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ course.course_name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <poster-actions
        :course="course"
        v-if="
          isTrainer &&
            course.user_id == getUser.user_id &&
            ![3, 4, 5].includes(course.current_status)
        "
      ></poster-actions>
      <v-btn icon @click="$root.$emit('close-dialog')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-title class="primary-title font-weight-bold justify-center">
      <v-row>
        <v-col cols="12">
          <v-alert
            type="error"
            outlined
            border="top"
            :value="true"
            v-if="course.current_status == 2"
          >
            <span v-text="HoldReasons"></span>
          </v-alert>
          <v-alert
            type="error"
            outlined
            border="top"
            :value="true"
            v-if="course.current_status == 3"
          >
            <span v-text="RejectReasons"></span>
          </v-alert>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      تاريخ الرفع {{ formateDate(course.publish_date) }}
    </v-card-subtitle>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formateDate } from "@/mixins/date";
export default {
  name: "poster-details-header",
  components: {
    "poster-actions": () => import("@/components/courses/course/posterActions")
  },
  props: ["course"],
  mixins: [formateDate],
  data() {
    return {
      HoldReasons: "",
      RejectReasons: ""
    };
  },
  computed: {
    ...mapGetters(["isTrainer", "getUser"])
  },
  mounted() {
    if (this.course.current_status == 2) {
      this.$store
        .dispatch("getCourseHolded", this.course.course_id)
        .then(res => {
          this.HoldReasons = res.event_details;
        });
    } else if (this.course.current_status == 3) {
      this.$store
        .dispatch("getCourseRejected", this.course.course_id)
        .then(res => {
          this.RejectReasons = res.event_details;
        });
    }
  }
};
</script>
