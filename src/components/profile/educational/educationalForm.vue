<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
      <v-card>
        <v-card-title class="primary-title justify-center">
          إضافة مؤهل
        </v-card-title>
        <v-card-text class="pb-2">
          <v-form lazy-validation ref="form">
            <v-autocomplete
              return-object
              :items="Educational_titles"
              :item-text="`${$vuetify.lang.current}_title`"
              item-value="title_id"
              outlined
              label="اختر المؤهل العلمي"
              v-model="qualification.qualification_title"
            ></v-autocomplete>
            <v-text-field
              prepend-inner-icon="mdi-account"
              label="الجهة التعليمية"
              outlined
              hint=""
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
                  label="سنة التخرج"
                  outlined
                  hint=""
                  v-on="on"
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
                <v-btn color="success" depressed block @click="insert">
                  إضافة
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
import { mapGetters } from "vuex";
export default {
  name: "educational-form",
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
    ...mapGetters(["Educational_titles"])
  },
  watch: {
    menu(newValue) {
      newValue && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    insert() {
      this.$store
        .dispatch("insertQualification", this.qualification)
        .then(res => {
          if (res == "inserted") {
            this.$root.$emit("show-alert", {
              status: "success",
              title: "تمت الإضافة",
              body:
                "تمت إضافة المؤهل بنجاح يمكنك متابعة الإضافة او الخروج من النموذج"
            });
            this.$refs.form.reset();
          }
        });
    }
  },
  mounted() {
    this.$store.dispatch("getEduTitles");
  }
};
</script>

<style></style>
