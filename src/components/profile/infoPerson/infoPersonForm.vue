<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            prepend-inner-icon="mdi-account"
            :label="FirstNameLabel"
            outlined
            clearable
            required
            :rules="[v => !!v || FirstNameError, ...nameRules]"
            v-model="first_name"
            ref="first_name"
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-account"
            :label="MiddleNameLabel"
            outlined
            clearable
            required
            :rules="[v => !!v || MiddleNameError, ...nameRules]"
            v-model="middle_name"
            ref="middle_name"
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-account"
            :label="LastNameLabel"
            outlined
            clearable
            required
            :rules="[v => !!v || LastNameError, ...nameRules]"
            v-model="last_name"
            ref="last_name"
          ></v-text-field>
          <v-text-field
            class="bt:1px"
            prepend-inner-icon="mdi-at"
            :label="EmailLabel"
            clearable
            :rules="[
              v =>
                /^([A-Za-z0-9_\.-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/.test(
                  v
                ) || EmailError,
              v => !!v || EmailRequired
            ]"
            validate-on-blur
            outlined
            type="email"
            required
            v-model="email"
            ref="email"
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-phone"
            :label="PhoneLabel"
            outlined
            type="text"
            clearable
            :rules="[
              v => !!v || PhoneRequired,
              v => /^(9665)([0-9]{1})([0-9]{7})$/.test(v) || PhonError
            ]"
            required
            v-model="phone"
            ref="phone"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on }">
                <v-btn icon class="my-0" @click="resetForm" v-on="on">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    email: "",
    formHasErrors: false
  }),

  computed: {
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
    form() {
      return {
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone
      };
    }
  }
};
</script>
