<template>
  <v-dialog width="500" transition="scroll-y-transition" v-model="openDialog">
    <template v-slot:activator="{ on }">
      <v-btn depressed block color="error" v-on="on">
        <span>{{ rejectCourse }}</span>
        <v-icon small class="mx-2">mdi-cancel</v-icon>
      </v-btn>
    </template>
    <v-card flat :loading="connectionState" :disabled="connectionState">
      <v-card-title class="primary-title justify-center">
        {{ rejectCourse }}
        <v-spacer></v-spacer>
        <v-btn icon @click="openDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form lazy-validation ref="form">
          <v-textarea
            rows="3"
            auto-grow
            :label="rejectReason"
            outlined
            required
            :rules="[v => !!v || rejectReasonError]"
            prepend-inner-icon="mdi-text"
            v-model="rejection.reasons"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container fluid class="py-0">
          <v-row justify="space-between">
            <v-col cols="3">
              <v-btn
                color="error"
                depressed
                @click="RejectCourse"
                class="text-start"
                block
              >
                {{ send }}
                <v-icon class="px-1">mdi-cancel</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "reject-course",
  props: ["course"],
  data() {
    return {
      connectionState: false,
      rejection: {
        reasons: ""
      },
      openDialog: false
    };
  },
  computed: {
    rejectCourse() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.rejectCourse");
    },
    rejectReason() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseSuper.rejectReason");
    },
    rejectReasonError() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseSuper.rejectReasonError");
    },
    send() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseSuper.send");
    },
    rejectCourseTitle() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.rejectCourseTitle");
    },
    rejectCourseBody() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.rejectCourseBody");
    }
  },
  methods: {
    RejectCourse() {
      if (this.$refs.form.validate()) {
        this.connectionState = true;
        this.$store
          .dispatch("RejectCourse", {
            course_id: this.course.course_id,
            reasons: this.rejection.reasons
          })
          .then(res => {
            if (res == "Rejected") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: this.rejectCourseTitle,
                body: this.rejectCourseBody
              });
            }
          });
        this.connectionState = false;
      }
    }
  }
};
</script>
