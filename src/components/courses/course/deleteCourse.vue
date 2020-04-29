<template>
  <v-btn dark icon @click="deleteCourse">
    <v-icon>mdi-delete-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "delete-course",
  inject: ["course"],
  methods: {
    deleteCourse() {
      let self = this;
      this.$root.$emit("show-alert", {
        status: "confirm",
        title: "تنبيه",
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
