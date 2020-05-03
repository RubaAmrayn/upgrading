<template>
  <v-img :src="posterPath" aspect-ratio="2.12" contain dark>
    <v-overlay
      absolute
      opacity="0.4"
      :value="true"
      style="width:100%; height:100%;"
      z-index="10"
    >
      <v-row class="fill-height">
        <v-col cols="12" class="pt-1">
          <v-card-title class="pt-0 px-1">
            <v-spacer></v-spacer>
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
// import { mapGetters } from "vuex";
export default {
  name: "poster-title",
  // props: ["course"],
  props: ["course"],
  components: {},
  computed: {
    // ...mapGetters(["getUser", "isTrainer"]),
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
