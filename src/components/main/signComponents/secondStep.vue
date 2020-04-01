<template>
  <v-stepper-content class="pb-1" step="2">
    <v-card flat>
      <v-card-title>
        <span>{{ CreateAccount }}</span>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-form ref="step2Form" lazy-validation>
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
            :rules="[v => !!v || PasswordError]"
          ></v-text-field>
          <v-text-field
            class="bt:1px"
            prepend-inner-icon="mdi-at"
            :label="EmailLabel"
            :rules="[
              v =>
                /^([A-Za-z0-9_\.-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/.test(
                  v
                ) || EmailError,
              v => !!v || EmailRequired
            ]"
            outlined
            type="email"
            hint="exmple@gmail.com"
            required
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-phone"
            :label="PhoneLabel"
            outlined
            type="text"
            hint="9665XXXXXXXX"
            :rules="[
              v => !!v || PhoneRequired,
              v => /^(9665)([0-9]{1})([0-9]{7})$/.test(v) || PhonError
            ]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>

    <v-row justify="end">
      <v-col cols="3">
        <v-btn block text @click="back">
          <v-icon>mdi-arrow-right</v-icon>
          {{ BtnSecondStep }}
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn block color="primary" @click="validateStep2">{{
          RegsBtn
        }}</v-btn>
      </v-col>
    </v-row>
  </v-stepper-content>
</template>

<script>
export default {
  name: "second-step",
  computed: {
    CreateAccount() {
      return this.$vuetify.lang.t("$vuetify.Sign.createAccount");
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
    EmailRequired() {
      return this.$vuetify.lang.t("$vuetify.Sign.emailRequired");
    },

    PhoneLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.phoneLabel");
    },
    PhonError() {
      return this.$vuetify.lang.t("$vuetify.Sign.phonError");
    },
    PhoneRequired() {
      return this.$vuetify.lang.t("$vuetify.Sign.phoneRequired");
    },
    RegsBtn() {
      return this.$vuetify.lang.t("$vuetify.Sign.regsBtn");
    },
    BtnSecondStep() {
      return this.$vuetify.lang.t("$vuetify.Sign.btnSecondStep");
    }
  },
  methods: {
    validateStep2() {
      if (this.$refs.step2Form.validate()) {
        alert("register");
      }
    },
    back() {
      this.$root.$emit("back");
    }
  }
};
</script>

<style></style>
