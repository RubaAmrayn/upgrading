<template>
  <div>
    <v-card flat>
      <v-card-title class="justify-end">
        <v-dialog
          max-width="650"
          transition="slide-y-transition"
          origin="top bottom"
        >
          <template #activator="{ on }">
            <v-btn color="info" depressed v-on="on">إضافة مؤهل؟</v-btn>
          </template>
          <educational-form></educational-form>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <educational-list></educational-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "educational-qualification",
  components: {
    "educational-form": () => import("@/components/profile/educationalForm"),
    "educational-list": () => import("@/components/profile/educationalList")
  },
  data() {
    return {};
  }
};
</script>
