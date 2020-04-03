<template>
  <div>
    <v-row justify="space-around">
      <v-icon @click="model--">mdi-minus</v-icon>
      {{ model }}
      <v-icon @click="model++">mdi-plus</v-icon>
    </v-row>
    <v-carousel v-model="model">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <h3 class="slid">{{ slide }}</h3>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slides: [this.fristSlide, this.secondSlide, this.thirdSlide],
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
