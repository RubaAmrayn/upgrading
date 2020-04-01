<template>
  <div>
    <v-row justify="center" align="center" style="height:100vh">
      <v-col cols="12" sm="10" md="5" lg="4" xl="4">
        <v-card
          loader-height="10"
          :loading="connectionState"
          :disabled="connectionState"
        >
          <v-stepper v-model="steps" alt-labels non-linear>
            <v-stepper-header>
              <v-stepper-step complete step="1" :editable="steps == 1">{{
                FirstStep
              }}</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                :complete="steps == 2"
                step="2"
                :editable="steps === 2"
                >{{ SecondStep }}</v-stepper-step
              >
            </v-stepper-header>

            <v-stepper-items>
              <first-step></first-step>
              <second-step></second-step>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firstStep from "@/components/main/signComponents/firstStep";
import secondStep from "@/components/main/signComponents/secondStep";
export default {
  name: "Sign",
  components: {
    "first-step": firstStep,
    "second-step": secondStep
  },
  data() {
    return {
      connectionState: false,
      steps: 1,
      editable: false
    };
  },
  computed: {
    FirstStep() {
      return this.$vuetify.lang.t("$vuetify.Sign.firstStep");
    },
    SecondStep() {
      return this.$vuetify.lang.t("$vuetify.Sign.secondStep");
    }
  },
  methods: {
    onInput(val) {
      this.steps = parseInt(val);
    }
    // save(date) {
    //   this.$refs.menu.save(date);
    // },
  },
  mounted() {
    this.$root.$on("next", () => {
      this.steps = 2;
    });
    this.$root.$on("back", () => {
      this.steps = 1;
    });
  },
  destroyed() {
    this.$root.$off("next");
    this.$root.$off("back");
  }
};
</script>
