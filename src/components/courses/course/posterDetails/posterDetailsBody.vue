<template>
  <v-card-text>
    <v-row>
      <v-subheader
        style="font-size: 1.4em;"
        class="py-0 px-3 mx-1 font-weight-bold"
      >
        <v-icon class="mx-2">mdi-card-text-outline</v-icon>
        {{ description }}
      </v-subheader>
      <v-col cols="12" class="py-0 makeScroll">
        <p
          class="px-3"
          style="font-size: large !important; text-align: justify;"
        >
          {{ course.course_description }}
        </p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" class="py-0 px-0">
        <template v-if="course.course_requirements.length > 0">
          <v-subheader
            style="font-size: 1.4em;"
            class="py-0 px-3 mx-1 font-weight-bold"
          >
            <v-icon class="mx-2" style="transform: rotate(180deg);"
              >mdi-format-list-checkbox</v-icon
            >
            {{ requirement }}
          </v-subheader>
          <v-list class="pt-0 mt-0">
            <v-list-item
              v-for="({ requirement_name }, i) in course.course_requirements"
              :key="i"
              class=""
            >
              <v-list-item-icon class="mx-2">
                <v-icon>mdi-checkbox-marked-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-text="requirement_name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <template v-else>
          <v-subheader
            style="font-size: 1.4em;"
            class="py-0 px-3 mx-1 font-weight-bold"
          >
            <v-icon class="mx-2" style="transform: rotate(180deg);"
              >mdi-format-list-checkbox</v-icon
            >
            لا يوجد متطلبات
          </v-subheader>
        </template>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  name: "poster-details-body",
  props: ["course"],

  computed: {
    description() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.description");
    },
    requirement() {
      return this.$vuetify.lang.t("$vuetify.InfoCourse.requirement");
    }
  }
};
</script>

<style>
.makeScroll {
  max-height: 200px;
  overflow: auto;
  scroll-padding: auto;
  scroll-behavior: smooth;
}
.descriptionText {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
