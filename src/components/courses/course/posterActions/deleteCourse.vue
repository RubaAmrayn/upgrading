<template>
  <v-btn icon @click="deleteCourse">
    <v-icon>mdi-delete</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "delete-course",
  props: ["course"],
  computed: {
    deleteTitle() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.deleteTitle");
    },
    deleteBody() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.deleteBody");
    },
    deleteConfirm() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.deleteConfirm");
    },
    deleteReject() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.deleteReject");
    },
    titleSuccess() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.titleSuccess");
    },
    bodySuccess() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.bodySuccess");
    }
  },
  methods: {
    deleteCourse() {
      let self = this;
      this.$root.$emit("show-alert", {
        status: "confirm",
        title: self.deleteTitle,
        body: self.deleteBody,
        confirmButtonText: self.deleteConfirm,
        rejectButtonText: self.deleteReject,
        data: self.course.course_id,
        action: "deleteOneCourse",
        onSuccess() {
          self.$root.$emit("show-alert", {
            status: "success",
            title: self.titleSuccess,
            body: self.bodySuccess
          });
        }
      });
    }
  }
};
</script>

<style></style>
