<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
      <v-card>
        <v-card-title class="primary-title justify-center">
          {{ experAdd }}
        </v-card-title>
        <v-card-text class="pb-2">
          <v-form lazy-validation ref="experForm">
            <v-autocomplete
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
              prepend-inner-icon="mdi-account"
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
                  prepend-inner-icon="mdi-school"
                  :label="experDate"
                  :rules="[v => !!v || experDateError]"
                  outlined
                  v-on="on"
                  readonly
                  :messages="checkForDate"
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
                <v-btn color="success" depressed block @click="experience_form">
                  {{ eduAdd }}
                  <v-icon>mdi-pencil-plus-outline</v-icon>
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
    dateRangeText() {
      return this.experience.experience_dates.join(" ~ ");
    },
    // checkForDate() {
    //   let dates = this.experience.experience_dates;
    //   if (dates.lenght == 0) {
    //     return "* قم باختيار تاريخ البداية و بعدها تاريخ النهاية";
    //   } else if (dates.length == 1) {
    //     return "تم اختيار تاريخ البداية اللآن اختر تاريخ النهاية";
    //   } else if (dates.length == 2) {
    //     return "تم اختيار التاريخين";
    //   } else {
    //     return "* قم باختيار تاريخ البداية و بعدها تاريخ النهاية";
    //   }
    // },

    ...mapGetters(["getExpTypes", "getExpLevels"])
  },
  watch: {
    menu(newValue) {
      newValue && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    insert() {
      console.log(this.experience);
      this.$store.dispatch("insertExperience", this.experience).then(res => {
        if (res == "inserted") {
          this.$root.$emit("show-alert", {
            status: "success",
            title: "تمت الاضافة ",
            body: "تمت إضافة الخبرة، تابع الإضافة  اذا كان لديك مزيد!"
          });
        }
      });
      this.$refs.form.reset();
    },
    experience_form() {
      if (this.$refs.experForm.validate()) {
        this.connectionState = true;
        //استدعاء ال action من ال vuex
        this.$store.dispatch("insert", this.experience).then(() => {
          this.connectionState = false;
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
