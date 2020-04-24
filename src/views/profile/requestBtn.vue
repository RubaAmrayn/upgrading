<template>
  <v-btn
    :style="makeStyle"
    :color="makeColor"
    :disabled="makeDisabled"
    depressed
    block
    @click="request"
    >{{ buttonText }}</v-btn
  >
</template>

<script>
// import requestTrainer from "@/store/requestTrainer";
// import { registerModule, unRegisterModule } from "@/mixins/vuexDynamicModules";
import { mapGetters } from "vuex";
export default {
  name: "request-btn",
  // mixins: [registerModule, unRegisterModule],
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "getQualifications",
      "getQualification_attachements",
      "getLastStatus"
    ]),
    requestTitle() {
      return this.$vuetify.lang.t("$vuetify.RequestBtn.requestTitle");
    },
    requestBody() {
      return this.$vuetify.lang.t("$vuetify.RequestBtn.requestBody");
    },
    makeStyle() {
      if ([3, 4, 6].includes(this.getLastStatus)) {
        return "pointer-events: none;";
      } else {
        return "";
      }
    },
    buttonText() {
      if (this.getLastStatus == 0) {
        return this.$vuetify.lang.t("$vuetify.RequestBtn.enrollmentOrder");
      } else if (this.getLastStatus == 6) {
        return this.$vuetify.lang.t("$vuetify.RequestBtn.underRviewOrder");
      } else if (this.getLastStatus == 3) {
        return this.$vuetify.lang.t("$vuetify.RequestBtn.rejectOrder");
      } else {
        return this.$vuetify.lang.t("$vuetify.RequestBtn.enrollmentOrder");
      }
    },
    makeColor() {
      if (this.getLastStatus == 0) {
        return "primary";
      } else if (this.getLastStatus == 6) {
        return "secondary";
      } else if (this.getLastStatus == 3) {
        return "error";
      } else {
        return "primary";
      }
    },
    makeDisabled() {
      if (
        this.getQualification_attachements.length == 0 ||
        this.getQualifications.length == 0
      ) {
        return true;
      } else {
        if (this.getLastStatus != 0) {
          if (this.getLastStatus == 6) {
            return false;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    request() {
      if (this.getLastStatus == 0) {
        this.$store.dispatch("requestTrainer").then(res => {
          if (res == "requested") {
            this.$root.$emit("show-alert", {
              status: "success",
              title: this.requestTitle,
              body: this.requestBody
            });
          }
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch("getOneTrainerRequest").then(() => {
      this.$store.dispatch("getOneEducationalAttachements");
      this.$store.dispatch("getEducationalOneQualifications", 0);
    });
  }
  // created() {
  //   this.registerStoreModule("requestTrainer", requestTrainer);
  // },
  // beforeDestroy() {
  //   this.unRegisterStoreModule("requestTrainer");
  // }
};
</script>
