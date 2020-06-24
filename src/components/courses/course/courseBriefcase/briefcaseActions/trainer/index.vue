<template>
  <v-card-actions>
    <v-container class="py-0">
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
          <v-alert
            type="success"
            outlined
            border="top"
            :value="true"
            v-if="course.current_status == 11"
          >
            <span>
              {{ HoldReasons }}
            </span>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-card-actions>
</template>

<script>
export default {
  name: "trainer-actions",
  props: ["course"],
  data() {
    return {
      rejectionReasons: "",
      HoldReasons: ""
    };
  },
  computed: {
    holdReasons() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.HoldReasons");
    }
  },
  mounted() {
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
  }
};
</script>

<style></style>
