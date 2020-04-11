<template>
  <v-row justify="center" class="pa-0 ma-0">
    <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
      <v-card>
        <v-card-title class="primary-title justify-center">
          {{ editInfo }}
        </v-card-title>
        <v-card-text class="pb-2">
          <v-form ref="form" lazy-validation>
            <v-text-field
              prepend-inner-icon="mdi-account"
              :label="FirstNameLabel"
              outlined
              clearable
              required
              :rules="[v => !!v || FirstNameError, ...nameRules]"
              v-model="user.first_name"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-account"
              :label="MiddleNameLabel"
              outlined
              clearable
              required
              :rules="[v => !!v || MiddleNameError, ...nameRules]"
              v-model="user.middle_name"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-account"
              :label="LastNameLabel"
              outlined
              clearable
              required
              :rules="[v => !!v || LastNameError, ...nameRules]"
              v-model="user.last_name"
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
                  v-model="user.date_of_birth"
                  :label="DateLabel"
                  outlined
                  :hint="DateHint"
                  persistent-hint
                  clearable
                  readonly
                  :rules="[v => !!v || DateError]"
                  v-on="on"
                  @focus="menu = true"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="user.date_of_birth"
                year-icon="mdi-calendar-outline"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                show-current="2013-07"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
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
              v-model="user.email"
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
              v-model="user.phone"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="py-0 px-1">
          <v-container fluid class="py-0">
            <v-row justify="space-between">
              <v-col cols="4">
                <v-btn color="primary" block depressed @click="Update()">{{
                  sendInfo
                }}</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn text block @click="closeDialog">{{ exitForm }}</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import nameValidation from "@/mixins/nameValidations";
import { mapGetters } from "vuex";
import { formatDate } from "@/mixins/date";
export default {
  name: "infoPerson-form",
  mixins: [nameValidation, formatDate],
  data() {
    return {
      menu: false,
      user: {
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        phone: "",
        email: ""
      }
    };
  },

  computed: {
    editInfo() {
      return this.$vuetify.lang.t("$vuetify.Personal.editInfo");
    },
    sendInfo() {
      return this.$vuetify.lang.t("$vuetify.Personal.sendInfo");
    },
    exitForm() {
      return this.$vuetify.lang.t("$vuetify.Personal.exitForm");
    },
    ...mapGetters(["getUser"]),
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
    updateTitle() {
      return this.$vuetify.lang.t("$vuetify.Info.updateTitle");
    },
    updateBody() {
      return this.$vuetify.lang.t("$vuetify.Info.updateBody");
    },
    updateElseTitle() {
      return this.$vuetify.lang.t("$vuetify.Info.updateElseTitle");
    },
    updateElseBody() {
      return this.$vuetify.lang.t("$vuetify.Info.updateElseBody");
    }
  },
  methods: {
    closeDialog() {
      this.$refs.form.reset();
      this.$root.$emit("info-Dialog");
    },
    Update() {
      this.$store.dispatch("updateUser", this.user).then(res => {
        if (res == "Updated") {
          this.$root.$emit("show-alert", {
            status: "success",
            title: this.updateTitle,
            body: this.updateBody
          });
        } else if (res == "nothing_new") {
          this.$root.$emit("show-alert", {
            status: "info",
            title: this.updateElseTitle,
            body: this.updateElseBody
          });
        }
      });
    }
  },
  mounted() {
    this.user = {
      first_name: this.getUser.first_name,
      middle_name: this.getUser.middle_name,
      last_name: this.getUser.last_name,
      date_of_birth: this.Formater(this.getUser.date_of_birth),
      phone: this.getUser.phone,
      email: this.getUser.email
    };
  }
};
</script>
