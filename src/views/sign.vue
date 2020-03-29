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
              <v-stepper-step
                :complete="steps == 2"
                step="2"
                :editable="steps === 2"
                >{{ SecondStep }}</v-stepper-step
              >
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-5" height="320px">
                  <v-card-title>
                    <span>{{ CreateAccount }}</span>
                  </v-card-title>
                  <v-card-text class="pb-0">
                    <v-form ref="SignForm" lazy-validation>
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        :label="NameLabel"
                        outlined
                        :hint="NameHint"
                        required
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
                            readonly
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
                          @change="save"
                        ></v-date-picker>
                      </v-menu>

                      <v-select
                        prepend-inner-icon="mdi-gender-female"
                        v-model="select"
                        :items="items"
                        :label="GenderLabel"
                        outlined
                        required
                      ></v-select>
                    </v-form>
                  </v-card-text>
                </v-card>
                <v-row justify="end">
                  <v-col cols="4">
                    <v-btn block color="primary" @click="steps = 2">
                      {{ BtnFirstStep }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-stepper-content>

              <v-divider></v-divider>

              <v-stepper-content step="2">
                <v-card class="mb-5" color=" lighten-1" height="400px">
                  <v-card-title>
                    <span>{{ CreateAccount }}</span>
                  </v-card-title>
                  <v-card-text class="pb-0">
                    <v-form ref="LoginForm" lazy-validation>
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        :label="UsernameLabel"
                        outlined
                        :hint="UsernameHint"
                        required
                        :rules="[v => !!v || UsernameError]"
                      ></v-text-field>

                      <v-text-field
                        prepend-inner-icon="mdi-lock"
                        :label="PasswordLabel"
                        outlined
                        type="password"
                        :hint="PasswordHint"
                        required
                      ></v-text-field>
                      <v-text-field
                        class="bt:1px"
                        prepend-inner-icon="mdi-at"
                        :label="EmailLabel"
                        outlined
                        type="email"
                        hint="yy@gmail.com"
                        required
                      ></v-text-field>
                      <v-text-field
                        prepend-inner-icon="mdi-phone"
                        :label="PhoneLabel"
                        outlined
                        type="text"
                        hint="050XXXXXXX"
                        required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                </v-card>

                <v-row justify="end">
                  <v-col cols="3">
                    <v-btn block text @click="steps = 1">{{
                      BtnSecondStep
                    }}</v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn block color="primary" @click="register">{{
                      RegsBtn
                    }}</v-btn>
                  </v-col>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Sign",
  data() {
    return {
      connectionState: false,
      steps: 1,
      editable: false,
      menu: false,
      date: null,
      select: null,
      items: ["ذكر", "انثى"]
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  computed: {
    FirstStep() {
      return this.$vuetify.lang.t("$vuetify.Sign.firstStep");
    },
    SecondStep() {
      return this.$vuetify.lang.t("$vuetify.Sign.secondStep");
    },
    CreateAccount() {
      return this.$vuetify.lang.t("$vuetify.Sign.createAccount");
    },
    NameLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.nameLabel");
    },
    NameHint() {
      return this.$vuetify.lang.t("$vuetify.Sign.nameHint");
    },
    NameError() {
      return this.$vuetify.lang.t("$vuetify.Sign.nameError");
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
    },
    UsernameLabel() {
      return this.$vuetify.lang.t("$vuetify.Login.username");
    },
    UsernameHint() {
      return this.$vuetify.lang.t("$vuetify.Login.usernameHint");
    },
    UsernameError() {
      return this.$vuetify.lang.t("$vuetify.Login.usernameError");
    },
    PasswordLabel() {
      return this.$vuetify.lang.t("$vuetify.Login.password");
    },
    PasswordHint() {
      return this.$vuetify.lang.t("$vuetify.Login.passwordHint");
    },
    PasswordError() {
      return this.$vuetify.lang.t("$vuetify.Login.passwordError");
    },
    PasswordLengthError() {
      return this.$vuetify.lang.t("$vuetify.Login.passwordLengthError");
    },
    EmailLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.emailLabel");
    },
    EmailError() {
      return this.$vuetify.lang.t("$vuetify.Sign.emailError");
    },
    PhoneLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.phoneLabel");
    },
    PhonError() {
      return this.$vuetify.lang.t("$vuetify.Sign.phonError");
    },
    RegsBtn() {
      return this.$vuetify.lang.t("$vuetify.Sign.regsBtn");
    },
    BtnSecondStep() {
      return this.$vuetify.lang.t("$vuetify.Sign.btnSecondStep");
    }
  },
  methods: {
    onInput(val) {
      this.steps = parseInt(val);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    register() {}
  }
};
</script>
