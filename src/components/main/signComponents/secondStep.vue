<template>
  <v-card flat color="transparent">
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
          clearable
          :rules="[v => !!v || UsernameError]"
          validate-on-blur
          v-model="user.username"
        ></v-text-field>

        <v-text-field
          prepend-inner-icon="mdi-lock"
          :label="PasswordLabel"
          outlined
          type="password"
          :hint="PasswordHint"
          required
          clearable
          :rules="[v => !!v || PasswordError]"
          validate-on-blur
          v-model="user.password"
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
          hint="exmple@gmail.com"
          required
          v-model="user.email"
        ></v-text-field>
        <v-text-field
          prepend-inner-icon="mdi-phone"
          :label="PhoneLabel"
          outlined
          type="text"
          hint="9665XXXXXXXX"
          clearable
          :rules="[
            v => !!v || PhoneRequired,
            v => /^(9665)([0-9]{1})([0-9]{7})$/.test(v) || PhonError
          ]"
          required
          v-model="user.phone"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-container fluid class="py-0">
        <v-row justify="space-between">
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
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "second-step",
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
        phone: ""
      }
    };
  },
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
        this.$root.$emit("connection");
        this.$store
          .dispatch("register", this.user)
          .then(res => {
            this.$root.$emit("connection");
            if (res) {
              this.$root.$emit("show-alert", {
                status: "success",
                title: "تم انشاء حسابك بنجاح",
                body: "رقم المستخدم الخاص فيك  " + res.user_id
              });
            }
          })
          .catch(err => {
            this.$root.$emit("show-alert", {
              status: "error",
              title: "حصل خطأ في انشاء الحساب",
              body: err
            });
          });
      }
    },
    back() {
      this.$root.$emit("back");
    }
  },
  mounted() {
    this.$root.$on("next", data => {
      (this.user.first_name = data.first_name),
        (this.user.middle_name = data.middle_name),
        (this.user.last_name = data.last_name),
        (this.user.date_of_birth = data.date_of_birth),
        (this.user.gender = data.gender.id);
    });
  }
};
</script>

<style></style>
