<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%" tile>
          <v-row
            :class="!slide.images ? 'fill-height' : ''"
            class="px-2"
            align="center"
            justify="center"
          >
            <v-col cols="12">
              <div class="text-center" style="color:black ; font-size: 50px">
                {{ slide.text }}
              </div>
            </v-col>
          </v-row>
          <div v-if="slide.images && slide.images.length">
            <v-row justify="end">
              <v-col cols="3">
                <v-img
                  :src="slide.images[0]"
                  alt="image 1"
                  contain
                  aspect-ratio="7.28"
                  class="text-start"
                ></v-img>
                <v-img
                  :src="slide.images[1]"
                  alt="image 3"
                  contain
                  aspect-ratio="7.28"
                  class="text-end"
                ></v-img>
              </v-col>
            </v-row>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  data(vm) {
    vm.$nextTick(() => {
      vm.slides = [
        {
          text: vm.fristSlide
        },
        {
          text: vm.secondSlide
        },
        {
          text: vm.thirdSlide,
          images: [require("@/assets/Qura.png"), require("@/assets/upgrad.jpg")]
        }
      ];
    });
    return {
      slides: [],
      colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
      model: 0
    };
  },
  computed: {
    fristSlide() {
      return this.$vuetify.lang.t("$vuetify.About.fristSlide");
    },
    secondSlide() {
      return this.$vuetify.lang.t("$vuetify.About.secondSlide");
    },
    thirdSlide() {
      return this.$vuetify.lang.t("$vuetify.About.thirdSlide");
    }
  }
};
</script>
<style></style>
