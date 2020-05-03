<template>
  <v-btn
    block
    depressed
    color="success"
    dark
    :loading="connectionState"
    @click="approveCourse"
  >
    قبول الدورة
    <v-icon class="px-1">mdi-check</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "approve-course",
  props: ["course"],
  data() {
    return {
      connectionState: false
    };
  },
  methods: {
    approveCourse() {
      this.connectionState = true;
      let data = {
        course_id: this.course.course_id
      };
      this.$store.dispatch("ApproveCourse", data).then(res => {
        if (res == "Approved") {
          this.$root.$emit("show-alert", {
            status: "success",
            title: "تم القبول",
            body: "تم قبول الدورة بنجاح و في انتظار رفع الحقيبة"
          });
        }
      });
    }
  }
};
</script>

<style></style>
