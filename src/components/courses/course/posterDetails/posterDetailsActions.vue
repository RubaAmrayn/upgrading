<template>
  <v-card-actions class="pa-0">
    <v-container class="py-0">
      <v-row justify="space-around">
        <v-col cols="4">
          <v-dialog width="500" transition="scroll-y-transition">
            <template v-slot:activator="{ on }">
              <v-btn depressed color="primary" v-on="on">
                <v-icon>mdi-history</v-icon>
                <span>الحقيبة</span>
              </v-btn>
            </template>
            <course-briefcase></course-briefcase>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-card-actions>
</template>

<script>
export default {
  name: "poster-details-actions",
  components: {
    "course-briefcase": () =>
      import("@/components/courses/course/courseBriefcase")
  },
  inject: ["course"]
};
</script>
