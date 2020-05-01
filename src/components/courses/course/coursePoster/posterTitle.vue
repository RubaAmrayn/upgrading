<template>
  <v-img :src="posterPath" aspect-ratio="2.12" contain dark>
    <v-overlay
      absolute
      opacity="0.4"
      :value="true"
      style="width:100%; height:100%;"
    >
      <v-row class="fill-height">
        <v-col cols="12" class="pt-1">
          <v-card-title class="pt-0 px-1">
            <v-spacer></v-spacer>
            <poster-actions
              v-if="isTrainer && course.user_id == getUser.user_id"
            ></poster-actions>
          </v-card-title>
        </v-col>
        <v-col cols="12" class="pb-0" style="align-self: flex-end;">
          <v-card-title class="white--text px-0 pb-0">
            <v-btn color="secondary" depressed class="posterTitle mr-auto;">
              {{ course.course_name }}
            </v-btn>
          </v-card-title>
        </v-col>
      </v-row>
    </v-overlay>
  </v-img>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "poster-title",
  // props: ["course"],
  inject: ["course"],
  components: {
    "poster-actions": () => import("@/components/courses/course/posterActions")
  },
  computed: {
    ...mapGetters(["getUser", "isTrainer"]),
    posterPath() {
      if (this.course && this.course.poster_path) {
        return "/public/" + this.course.poster_path;
      } else {
        return require("@/assets/upgrad.jpg");
      }
    }
  }
};
</script>

<style>
.posterTitle {
  opacity: 0.8;
  pointer-events: none;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
