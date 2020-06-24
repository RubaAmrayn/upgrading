<template>
  <v-card flat :loading="connectionState" :disabled="connectionState">
    <v-card-title class="primary-title justify-center">
      {{ rejectBriefcase }}
      <v-spacer></v-spacer>
      <v-btn icon>
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
      <v-row justify="space-between">
        <v-col cols="3">
          <v-btn
            color="error"
            depressed
            @click="RejectBriefcase"
            class="text-start"
            block
          >
            {{ send }}
            <v-icon class="px-1">mdi-cancel</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn
            text
            @click="$root.$emit('show-controlls')"
            class="text-end"
            block
            >{{ back }}</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "reject-briefcase",
  props: ["course"],
  data() {
    return {
      connectionState: false,
      rejection: {
        reasons: ""
      },
      menu: false
    };
  },
  computed: {
    rejectBriefcase() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseSuper.rejectBriefcase");
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
    back() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseSuper.back");
    },
    rejectBriefcaseTitle() {
      return this.$vuetify.lang.t(
        "$vuetify.BriefcaseSuper.rejectBriefcaseTitle"
      );
    },
    rejectBriefcaseBody() {
      return this.$vuetify.lang.t(
        "$vuetify.BriefcaseSuper.rejectBriefcaseBody"
      );
    }
  },
  methods: {
    RejectBriefcase() {
      if (this.$refs.form.validate()) {
        this.connectionState = true;
        this.$store
          .dispatch("rejectBriefcase", {
            course_id: this.course.course_id,
            reasons: this.rejection.reasons
          })
          .then(res => {
            if (res == "rejected") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: this.rejectBriefcaseTitle,
                body: this.rejectBriefcaseBody
              });
            }
          });
        this.connectionState = false;
      }
    }
  }
};
</script>
