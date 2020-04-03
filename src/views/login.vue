<template>
  <div>
    <v-row justify="center" align="center" style="height:100vh">
      <v-col cols="12" sm="10" md="5" lg="4" xl="4">
        <v-card
          loader-height="10"
          :loading="connectionState"
          :disabled="connectionState"
        >
          <v-card-title class="pramiry-title">
            <v-img
              class="align-end"
              src="@/assets/upgrad.jpg"
              contain
              aspect-ratio="3.14"
            ></v-img>
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
                v-model="user.username"
              ></v-text-field>

              <v-text-field
                prepend-inner-icon="mdi-lock"
                :label="PasswordLabel"
                outlined
                type="password"
                :hint="PasswordHint"
                required
                :rules="[
                  v => !!v || PasswordError,
                  v => (!!v && v.length > 5) || PasswordLengthError
                ]"
                v-model="user.password"
              ></v-text-field>
            </v-form>
            <router-link to="/forgotPass">
              {{ LoginRest }}
            </router-link>
          </v-card-text>
          <v-card-actions class="pa-0">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <v-btn block color="pramiry" dark @click="Login">
                    {{ LoginBtn }}
                    <v-icon style="transform:rotate(180deg)">mdi-login</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-1">
                  <router-link to="/sign">
                    {{ CreateAccount }}
                  </router-link>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      connectionState: false,
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
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
    LoginRest() {
      return this.$vuetify.lang.t("$vuetify.Login.resetPassword");
    },
    LoginBtn() {
      return this.$vuetify.lang.t("$vuetify.Login.LoginBtn");
    },
    CreateAccount() {
      return this.$vuetify.lang.t("$vuetify.Login.CreateAccount");
    }
  },
  methods: {
    Login() {
      if (this.$refs.LoginForm.validate()) {
        this.connectionState = true;
        //استدعاء ال action من ال vuex
        this.$store.dispatch("login", this.user);
      }
    }
  }
};
</script>

<style></style>
