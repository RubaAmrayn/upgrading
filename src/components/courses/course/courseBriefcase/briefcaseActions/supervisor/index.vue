<template>
  <v-card-actions>
    <v-container
      grid-list-xs
      v-if="[7, 8].includes(course.current_id) != false"
    >
      <v-row justify="space-between" v-if="showControlls == 'show-all'">
        <v-col cols="4">
          <v-btn
            block
            color="error"
            dark
            depressed
            @click="showControlls = 'reject'"
            >رفض</v-btn
          >
        </v-col>
        <v-col cols="4">
          <v-btn
            block
            color="secondary"
            dark
            depressed
            @click="showControlls = 'hold'"
            >تعليق</v-btn
          >
        </v-col>
        <v-col cols="4">
          <v-btn block color="primary" dark depressed>موافقه</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <reject-briefcase v-if="showControlls == 'reject'"></reject-briefcase>
          <hold-briefcase v-else-if="showControlls == 'hold'"></hold-briefcase>
          <div v-else></div>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      grid-list-xs
      v-else-if="[7, 8].includes(course.current_status)"
    >
      <v-row>
        <v-col cols="12">
          <v-alert
            type="error"
            outlined
            border="top"
            :value="true"
            v-if="course.current_status == 7"
          >
            <span v-text="rejectionReasons"></span>
          </v-alert>
          <v-alert
            type="warning"
            outlined
            border="top"
            :value="true"
            v-if="course.current_status == 8"
          >
            <span v-text="HoldReasons"></span>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-card-actions>
</template>

<script>
export default {
  name: "supervisor-briefcase-actions",
  components: {
    "reject-briefcase": () => import("./rejectBriefcase"),
    "hold-briefcase": () => import("./holdBriefcase")
  },
  inject: ["course"],
  data() {
    return {
      showControlls: "show-all",
      rejectionReasons: "",
      HoldReasons: ""
    };
  },
  mounted() {
    this.$root.$on("show-controlls", () => (this.showControlls = "show-all"));
    if (this.course.current_status == 7) {
      this.$store
        .dispatch("getBriefcaseRejection", this.course.course_id)
        .then(res => {
          this.rejectionReasons = res.event_details;
        });
    } else if (this.course.current_status == 8) {
      this.$store
        .dispatch("getBriefcaseHolded", this.course.course_id)
        .then(res => {
          this.HoldReasons = res.event_details;
        });
    }
  },
  destroyed() {
    this.$root.$off("show-controlls");
  }
};
</script>
