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
            <v-btn color="info" depressed v-on="on">تعديل</v-btn>
          </template>
          <infoPerson-form></infoPerson-form>
        </v-dialog>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "info-person",
  components: {
    "infoPerson-form": () =>
      import("@/components/profile/infoPerson/infoPersonForm")
  },
  data() {
    return {};
  }
};
</script>
