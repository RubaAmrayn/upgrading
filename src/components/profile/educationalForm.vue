<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="5" lg="5" xl="4">
      <v-card>
        <v-card-title class="primary-title justify-center">
          إضافة مؤهل
        </v-card-title>
        <v-card-text class="pb-2">
          <v-form lazy-validation>
            <v-autocomplete
              return-object
              :items="Educational_titles"
              item-text="ar_title"
              item-value="title_id"
              outlined
              label="اختر المؤهل العلمي"
            ></v-autocomplete>
            <v-text-field
              prepend-inner-icon="mdi-account"
              label="الجهة التعليمية"
              outlined
              hint=""
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
                  v-model="date"
                  prepend-inner-icon="mdi-school"
                  label="سنة التخرج"
                  outlined
                  hint=""
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu = false"
                type="month"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-row justify="center">
            <v-col cols="6" class="py-1">
              <v-btn color="success" block>
                إضافة
                <v-icon>mdi-pencil-plus-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
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
      menu: false,
      date: null
    };
  },
  computed: {
    ...mapGetters(["Educational_titles"])
  },
  mounted() {
    this.$store.dispatch("getEduTitles");
  }
};
</script>

<style></style>
