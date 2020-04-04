<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%" tile>
          <v-row class="fill-height px-2" align="center" justify="center">
            <v-col cols="12">
              <div class="display-1 text-center">{{ slide }}</div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  data(vm) {
    vm.$nextTick(() => {
      vm.slides = [vm.fristSlide, vm.secondSlide, vm.thirdSlide];
    });
    return {
      slides: [],
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
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
<style>
.slid {
  text-align: center;
  font-size: 50px;
}
</style>
