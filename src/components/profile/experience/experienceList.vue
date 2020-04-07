<template>
  <div>
    <v-card
      v-if="getExperinces.length == 0"
      class="pa-3 mb-1"
      style="border-right: 3px solid var(--v-info-base)"
      flat
    >
      <div class="title text-center">
        لا يوجد لديك خبرات للسف
      </div>
    </v-card>
    <v-card
      v-else
      v-for="(experience, i) in getExperinces"
      :key="i"
      flat
      shaped
      class="pa-2 mb-1"
      style="border-right: 3px solid var(--v-primary-base)"
    >
      <template>
        <v-row justify="center" class="px-2">
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              الخبرة
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.experince_name }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title center-text">
              تاريخ البداية
            </div>
            <div class="subtitle-1 justify-center">
              {{ new Date(experience.start_date).toLocaleDateString("en-sa") }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title center-text">
              تاريخ النهاية
            </div>
            <div class="subtitle-1 justify-center">
              {{ new Date(experience.end_date).toLocaleDateString("en-sa") }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              نوع الخبرة
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.ar_experince_type }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              مستوى الخبرة
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.ar_exp_level }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              الاحداث
            </div>
            <div class="subtitle-1 justify-center">
              <v-btn icon>
                <v-icon>mdi-pencil-circle-outline</v-icon>
              </v-btn>
              <v-btn icon @click="deleteQualification(experience.experince_id)">
                <v-icon>mdi-delete-circle-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-folder-outline</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "experience-list",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getExperinces"])
  },
  methods: {
    deleteExperince() {
      return;
    }
  },
  mounted() {
    this.$store.dispatch("getOneUserExperience");
  }
};
</script>
