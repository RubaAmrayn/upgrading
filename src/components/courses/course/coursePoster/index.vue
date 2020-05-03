<template>
  <div>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card style="border-radius: 6px" class="mx-auto">
          <poster-title :course="course" style="height:180px;"></poster-title>
          <poster-body :course="course"></poster-body>
          <v-fade-transition>
            <v-overlay v-if="hover" z-index="8" absolute color="#036358">
              <v-row justify="center" align="center" style="height: 100%">
                <v-col cols="6">
                  <v-btn block>{{ details }}</v-btn>
                </v-col>
              </v-row>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "course-poster",
  components: {
    "poster-title": () => import("./posterTitle"),
    "poster-body": () => import("./posterBody")
  },
  computed: {
    details() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.details");
    }
  },
  props: ["course"]
};
</script>

<style></style>
