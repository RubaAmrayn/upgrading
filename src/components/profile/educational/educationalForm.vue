<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
      <v-card>
        <v-card-title
          class="primary-title justify-center"
          v-if="method == 'Add'"
        >
          {{ cardAddTitle }}
        </v-card-title>
        <v-card-title
          class="primary-title justify-center"
          v-else-if="method == 'Update'"
        >
          {{ cardUpdateTitle }}
        </v-card-title>
        <v-card-text class="pb-2">
          <v-form lazy-validation ref="eduForm">
            <v-autocomplete
              prepend-inner-icon="mdi-playlist-edit"
              return-object
              :items="Educational_titles"
              :item-text="`${$vuetify.lang.current}_title`"
              item-value="title_id"
              outlined
              :label="selectQualification"
              :rules="[v => !!v || qualificationsError]"
              v-model="qualification.qualification_title"
            ></v-autocomplete>
            <v-text-field
              prepend-inner-icon="mdi-account"
              :label="eduPlace"
              outlined
              hint=""
              :rules="[v => !!v || eduPlaceError, ...nameRules]"
              v-model="qualification.universty_name"
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
                  v-model="qualification.graduation_year"
                  prepend-inner-icon="mdi-school"
                  :label="gradYear"
                  outlined
                  hint=""
                  :rules="[v => !!v || dateError]"
                  v-on="on"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="qualification.graduation_year"
                ref="picker"
                @input="menu = false"
                type="month"
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
                  @click="educational_Add_form"
                  v-if="method == 'Add'"
                >
                  {{ eduAdd }}
                  <v-icon>mdi-pencil-plus-outline</v-icon>
                </v-btn>
                <v-btn
                  color="success"
                  depressed
                  block
                  @click="educational_Update_form"
                  v-else-if="method == 'Update'"
                >
                  {{ eduUpdate }}
                  <v-icon>mdi-pencil-circle-outline</v-icon>
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
  name: "educational-form",
  mixins: [nameValidations],
  props: {
    method: {
      type: String,
      required: true
    },
    qualification_id: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      showDialog: true,
      menu: false,
      qualification: {
        universty_name: "",
        graduation_year: null,
        qualification_title: null
      }
    };
  },
  computed: {
    cardAddTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.cardAddTitle");
    },
    cardUpdateTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.cardUpdateTitle");
    },
    selectQualification() {
      return this.$vuetify.lang.t("$vuetify.Educational.selectQualification");
    },
    eduPlace() {
      return this.$vuetify.lang.t("$vuetify.Educational.eduPlace");
    },
    gradYear() {
      return this.$vuetify.lang.t("$vuetify.Educational.gradYear");
    },
    eduAdd() {
      return this.$vuetify.lang.t("$vuetify.Educational.eduAdd");
    },
    eduUpdate() {
      return this.$vuetify.lang.t("$vuetify.Educational.eduUpdate");
    },
    dateError() {
      return this.$vuetify.lang.t("$vuetify.Educational.dateError");
    },
    qualificationsError() {
      return this.$vuetify.lang.t("$vuetify.Educational.qualificationsError");
    },
    eduPlaceError() {
      return this.$vuetify.lang.t("$vuetify.Educational.eduPlaceError");
    },
    ...mapGetters(["Educational_titles"])
  },
  watch: {
    method: {
      immediate: true,
      handler(newValue) {
        if (newValue == "Update") {
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
        this.$store.dispatch("FillEduForm", this.qualification_id).then(res => {
          this.qualification = res;
        });
      }
    },
    educational_Add_form() {
      if (this.$refs.eduForm.validate()) {
        this.connectionState = true;
        this.$store
          .dispatch("insertQualification", this.qualification)
          .then(res => {
            this.connectionState = false;
            if (res == "inserted") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: "تمت الإضافة",
                body:
                  "تمت إضافة المؤهل بنجاح يمكنك متابعة الإضافة او الخروج من النموذج"
              });
              this.$refs.eduForm.reset();
            }
          })
          .catch(() => {});
      }
    },
    educational_Update_form() {
      if (this.$refs.eduForm.validate()) {
        this.connectionState = true;
        let qualification_id = this.qualification_id;
        this.$store
          .dispatch(
            "updateQualification",
            Object.assign({}, this.qualification, { qualification_id })
          )
          .then(res => {
            this.connectionState = false;
            if (res == "Updated") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: "تمت التحديث",
                body: "تمت تحديث المؤهل بنجاح"
              });
              this.$refs.eduForm.reset();
              // this.$root.$emit("close-educational-form");
            } else if (res == "nothing_new") {
              this.$root.$emit("show-alert", {
                status: "info",
                title: "تم التنفيذ",
                body: "تم تنفيذ العملية لكن لايوجد قيم جديدة"
              });
            }
          });
      }
    }
  },
  mounted() {
    this.$store.dispatch("getEduTitles");
  }
};
</script>

<style></style>
