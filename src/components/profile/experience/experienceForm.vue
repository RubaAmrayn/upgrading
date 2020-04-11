<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
      <v-card>
        <v-card-title
          class="primary-title justify-center"
          v-if="method == 'Add'"
        >
          {{ experAdd }}
        </v-card-title>
        <v-card-title
          class="primary-title justify-center"
          v-else-if="method == 'Update'"
        >
          {{ experUpdate }}
        </v-card-title>
        <v-card-text class="pb-2">
          <v-form lazy-validation ref="experForm">
            <v-autocomplete
              prepend-inner-icon="mdi-playlist-edit"
              return-object
              :items="getExpTypes"
              :item-text="`${$vuetify.lang.current}_experince_type`"
              item-value="type_id"
              outlined
              :label="experSelect"
              :rules="[v => !!v || experSelectError]"
              v-model="experience.experience_type"
            ></v-autocomplete>
            <v-autocomplete
              prepend-inner-icon="mdi-star"
              return-object
              :items="getExpLevels"
              :item-text="`${$vuetify.lang.current}_exp_level`"
              item-value="exp_level_id"
              outlined
              :label="experLevel"
              :rules="[v => !!v || experLevelError]"
              v-model="experience.experience_level"
            ></v-autocomplete>
            <v-text-field
              prepend-inner-icon="mdi-rename-box"
              :label="experName"
              outlined
              hint=""
              :rules="[v => !!v || experNameError]"
              v-model="experience.experience_name"
            ></v-text-field>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateRangeText"
                  prepend-inner-icon="mdi-calendar-range"
                  :label="experDate"
                  required
                  :rules="[
                    v => !!v || experDateError,
                    v =>
                      (!!v && v.split(' ~ ').length === 2) || experDateTwoError
                  ]"
                  outlined
                  v-on="on"
                  readonly
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="experience.experience_dates"
                ref="picker"
                @input="menu = false"
                range
                year-icon="mdi-calendar-outline"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                show-current="2013-07"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-container class="pa-1">
            <v-row justify="center">
              <v-col cols="6" class="py-1">
                <v-btn
                  color="success"
                  depressed
                  block
                  @click="experience_add_form"
                  v-if="method == 'Add'"
                >
                  {{ eduAdd }}
                  <v-icon>mdi-pencil-plus-outline</v-icon>
                </v-btn>
                <v-btn
                  color="success"
                  depressed
                  block
                  @click="experience_update_form"
                  v-else-if="method == 'Update'"
                >
                  {{ eduUpdate }}
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import nameValidations from "@/mixins/nameValidations";
import { mapGetters } from "vuex";
export default {
  name: "experience-form",
  mixins: [nameValidations],
  props: {
    method: {
      type: String,
      required: true
    },
    experience_id: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      showDialog: true,
      menu: false,
      experience: {
        experience_name: "",
        experience_dates: [],
        experience_type: {},
        experience_level: {}
      }
    };
  },
  computed: {
    experAdd() {
      return this.$vuetify.lang.t("$vuetify.Experience.experAdd");
    },
    experUpdate() {
      return this.$vuetify.lang.t("$vuetify.Experience.experUpdate");
    },
    experSelect() {
      return this.$vuetify.lang.t("$vuetify.Experience.experSelect");
    },
    experLevel() {
      return this.$vuetify.lang.t("$vuetify.Experience.experLevel");
    },
    experName() {
      return this.$vuetify.lang.t("$vuetify.Experience.experName");
    },
    experDate() {
      return this.$vuetify.lang.t("$vuetify.Experience.experDate");
    },
    eduAdd() {
      return this.$vuetify.lang.t("$vuetify.Educational.eduAdd");
    },
    eduUpdate() {
      return this.$vuetify.lang.t("$vuetify.Educational.eduUpdate");
    },
    experSelectError() {
      return this.$vuetify.lang.t("$vuetify.Experience.experSelectError");
    },
    experLevelError() {
      return this.$vuetify.lang.t("$vuetify.Experience.experLevelError");
    },
    experNameError() {
      return this.$vuetify.lang.t("$vuetify.Experience.experNameError");
    },
    experDateError() {
      return this.$vuetify.lang.t("$vuetify.Experience.experDateError");
    },
    experDateTwoError() {
      return this.$vuetify.lang.t("$vuetify.Experience.experDateTwoError");
    },
    addTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.addTitle");
    },
    addBody() {
      return this.$vuetify.lang.t("$vuetify.Experience.addBody");
    },
    updateTitle() {
      return this.$vuetify.lang.t("$vuetify.Experience.updateTitle");
    },
    updateBody() {
      return this.$vuetify.lang.t("$vuetify.Experience.updateBody");
    },
    updateElseTitle() {
      return this.$vuetify.lang.t("$vuetify.Experience.updateElseTitle");
    },
    updateElseBody() {
      return this.$vuetify.lang.t("$vuetify.Experience.updateElseBody");
    },
    updateErrorTitle() {
      return this.$vuetify.lang.t("$vuetify.Experience.updateErrorTitle");
    },
    updateErrorBody() {
      return this.$vuetify.lang.t("$vuetify.Experience.updateErrorBody");
    },
    dateRangeText() {
      return this.experience.experience_dates.join(" ~ ");
    },
    ...mapGetters(["getExpTypes", "getExpLevels"])
  },
  watch: {
    experience_id: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.fillForm();
        }
      }
    },
    menu(newValue) {
      newValue && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    fillForm() {
      if (this.method == "Update") {
        this.$store.dispatch("FillExpForm", this.experience_id).then(res => {
          this.experience = res[0];
        });
      }
    },
    experience_add_form() {
      if (this.$refs.experForm.validate()) {
        this.connectionState = true;
        this.$store.dispatch("insertExperience", this.experience).then(res => {
          this.connectionState = false;
          if (res == "inserted") {
            this.$root.$emit("show-alert", {
              status: "success",
              title: this.addTitle,
              body: this.addBody
            });
          }
        });

        this.$refs.experForm.reset();
      }
    },
    experience_update_form() {
      if (this.$refs.experForm.validate()) {
        let experience = {
          experience_name: this.experience.experience_name,
          start_date: this.experience.experience_dates[0],
          end_date: this.experience.experience_dates[1],
          Experince_types_id: this.experience.experience_type.type_id,
          experince_level: this.experience.experience_level.exp_level_id,
          experince_id: this.experience_id
        };
        this.$store
          .dispatch("updateExperince", experience)
          .then(res => {
            if (res == "Updated") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: this.updateTitle,
                body: this.updateBody
              });
              this.$refs.experForm.reset();
              // this.$root.$emit("close-experince-form");
            } else if (res == "nothing_new") {
              this.$root.$emit("show-alert", {
                status: "info",
                title: this.updateElseTitle,
                body: this.updateElseBody
              });
            }
          })
          .catch(err => {
            if (err == "not updted") {
              this.$root.$emit("show-alert", {
                status: "error",
                title: this.updateErrorTitle,
                body: this.updateElseBody
              });
            }
          });
      }
    }
  },
  mounted() {
    this.$store.dispatch("getExpTypes");
    this.$store.dispatch("getExpLevels");
  }
};
</script>
<style>
form
  > div
  > div.v-input__control
  > div.v-text-field__details
  > div.v-messages
  > div {
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.8);
}
</style>
