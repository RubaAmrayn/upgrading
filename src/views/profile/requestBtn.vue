<template>
  <v-btn
    :color="makeColor"
    :disabled="makeDisabled"
    depressed
    block
    @click="request"
    >{{ buttonText }}</v-btn
  >
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "request-btn",
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "getQualifications",
      "getQualification_attachements",
      "getLastStatus"
    ]),
    buttonText() {
      if (this.getLastStatus == 0) {
        return "طلب إلتحاق";
      } else if (this.getLastStatus == 6) {
        return "طلبك قيد المراجعة";
      } else {
        return "طلب إلتحاق";
      }
    },
    makeColor() {
      if (this.getLastStatus == 0) {
        return "primary";
      } else if (this.getLastStatus == 6) {
        return "secondary";
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
        this.$store.dispatch("requestTrainee").then(res => {
          if (res == "requested") {
            this.$root.$emit("show-alert", {
              status: "success",
              title: "تم رفع الطلب",
              body: "تم رفع طلبك وقيد مراجعة المسؤول"
            });
          }
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch("getOneTraineeRequest").then(() => {
      this.$store.dispatch("getOneEducationalAttachements");
      this.$store.dispatch("getEducationalOneQualifications");
    });
  }
};
</script>
