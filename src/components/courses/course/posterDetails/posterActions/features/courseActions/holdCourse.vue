<template>
  <v-dialog width="500" transition="scroll-y-transition" v-model="openDialog">
    <template v-slot:activator="{ on }">
      <v-btn depressed block color="secodary" v-on="on">
        <span>{{ holdCourse }}</span>
        <v-icon small class="mx-2">mdi-pause</v-icon>
      </v-btn>
    </template>
    <v-card flat :loading="connectionState" :disabled="connectionState">
      <v-card-title class="primary-title justify-center">
        {{ holdCourse }}
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
            :label="holdReason"
            outlined
            required
            :rules="[v => !!v || holdReasonError]"
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
                color="secondary"
                depressed
                @click="HoldCourse"
                class="text-start"
                block
              >
                {{ send }}
                <v-icon class="px-1">mdi-pause</v-icon>
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
  name: "hold-course",
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
    holdCourse() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.holdCourse");
    },
    holdReason() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseSuper.holdReason");
    },
    holdReasonError() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseSuper.holdReasonError");
    },
    send() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseSuper.send");
    },
    holdCourseTitle() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.holdCourseTitle");
    },
    holdCourseBody() {
      return this.$vuetify.lang.t("$vuetify.CourseSuper.holdCourseBody");
    }
  },
  methods: {
    HoldCourse() {
      if (this.$refs.form.validate()) {
        this.connectionState = true;
        this.$store
          .dispatch("holdCourse", {
            course_id: this.course.course_id,
            reasons: this.rejection.reasons
          })
          .then(res => {
            if (res == "Holded") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: this.holdCourseTitle,
                body: this.holdCourseBody
              });
            }
          });
        this.connectionState = false;
      }
    }
  }
};
</script>
