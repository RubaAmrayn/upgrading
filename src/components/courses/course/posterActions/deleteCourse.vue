<template>
  <v-btn dark icon @click="deleteCourse">
    <v-icon>mdi-delete-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "delete-course",
  props: ["course"],
  computed: {
    deleteTitle() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.deleteTitle");
    },
    deleteBody() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.deleteBody");
    },
    deleteConfirm() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.deleteConfirm");
    },
    deleteReject() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.deleteReject");
    },
    titleSuccess() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.titleSuccess");
    },
    bodySuccess() {
      return this.$vuetify.lang.t("$vuetify.newCourseForm.bodySuccess");
    }
  },
  methods: {
    deleteCourse() {
      let self = this;
      this.$root.$emit("show-alert", {
        status: "confirm",
        title: "تبيه",
        body: "هل انت متأكد من حذف الدورة",
        confirmButtonText: "موافق",
        rejectButtonText: "الغاء",
        data: self.course.course_id,
        action: "deleteOneCourse",
        onSuccess() {
          self.$root.$emit("show-alert", {
            status: "success",
            title: "تم الحذف",
            body: "تم حذف الدورة التدريبة بنجاح "
          });
        }
      });
    }
  }
};
</script>

<style></style>
