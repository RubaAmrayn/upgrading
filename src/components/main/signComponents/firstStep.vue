<template>
  <v-stepper-content class="pb-1" step="1">
    <v-card flat>
      <v-card-title>
        <span>{{ CreateAccount }}</span>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-form ref="step1Form" lazy-validation>
          <v-text-field
            prepend-inner-icon="mdi-account"
            :label="FirstNameLabel"
            outlined
            clearable
            required
            :rules="[v => !!v || FirstNameError, ...nameRules]"
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-account"
            :label="MiddleNameLabel"
            outlined
            clearable
            required
            :rules="[v => !!v || MiddleNameError, ...nameRules]"
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-account"
            :label="LastNameLabel"
            outlined
            clearable
            required
            :rules="[v => !!v || LastNameError, ...nameRules]"
          ></v-text-field>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="slide-y-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                prepend-inner-icon="mdi-calendar-month"
                v-model="date"
                :label="DateLabel"
                outlined
                :hint="DateHint"
                persistent-hint
                clearable
                readonly
                :rules="[v => !!v || DateError]"
                validate-on-blur
                v-on="on"
                @focus="menu = true"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date"
              year-icon="mdi-calendar-outline"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              show-current="2013-07"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>

          <v-select
            prepend-inner-icon="mdi-gender-female"
            v-model="select"
            :items="items"
            :label="GenderLabel"
            outlined
            required
            :rules="[v => !!v || GenderError]"
          ></v-select>
        </v-form>
      </v-card-text>
    </v-card>
    <v-row justify="end">
      <v-col cols="4">
        <v-btn block color="primary" @click="validateStep1()">
          {{ BtnFirstStep }}
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-stepper-content>
</template>

<script>
import nameValidations from "@/mixins/nameValidations";
export default {
  name: "first-step",
  mixins: [nameValidations],
  data() {
    return {
      menu: false,
      date: null,
      select: null,
      items: ["ذكر", "انثى"]
    };
  },
  computed: {
    CreateAccount() {
      return this.$vuetify.lang.t("$vuetify.Sign.createAccount");
    },
    FirstNameLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.firstNameLabel");
    },
    MiddleNameLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.middleNameLabel");
    },
    LastNameLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.lastNameLabel");
    },
    FirstNameError() {
      return this.$vuetify.lang.t("$vuetify.Sign.firstNameError");
    },
    MiddleNameError() {
      return this.$vuetify.lang.t("$vuetify.Sign.middleNameError");
    },
    LastNameError() {
      return this.$vuetify.lang.t("$vuetify.Sign.lastNameError");
    },
    DateLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.dateLabel");
    },
    DateHint() {
      return this.$vuetify.lang.t("$vuetify.Sign.dateHint");
    },
    DateError() {
      return this.$vuetify.lang.t("$vuetify.Sign.dateError");
    },
    GenderLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.genderLabel");
    },
    GenderError() {
      return this.$vuetify.lang.t("$vuetify.Sign.genderError");
    },
    BtnFirstStep() {
      return this.$vuetify.lang.t("$vuetify.Sign.btnFirstStep");
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    validateStep1() {
      if (this.$refs.step1Form.validate()) {
        this.$root.$emit("next");
      }
    }
  }
};
</script>

<style></style>
