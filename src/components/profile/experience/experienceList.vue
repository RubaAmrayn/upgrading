<template>
  <div>
    <v-card
      v-if="getQualifications.length == 0"
      class="pa-3 mb-1"
      style="border-right: 3px solid var(--v-info-base)"
      flat
    >
      <div class="title text-center">
        {{ qualificationNo }}
      </div>
    </v-card>
    <v-card
      v-else
      v-for="(qualification, i) in getQualifications"
      :key="i"
      flat
      shaped
      class="pa-2 mb-1"
      style="border-right: 3px solid var(--v-primary-base)"
    >
      <template>
        <v-row justify="center" class="px-2">
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="title justify-center">
              الخبرة
            </div>
            <div class="subtitle-1 justify-center">
              {{ qualification.ar_title }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="title center-text">
              سنة الخبرة
            </div>
            <div class="subtitle-1 justify-center">
              {{ qualification.graduation_year }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="title justify-center">
              مكان الخبرة
            </div>
            <div class="subtitle-1 justify-center">
              {{ qualification.universty_name }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="title justify-center">
              الاحداث
            </div>
            <div class="subtitle-1 justify-center">
              <v-btn icon>
                <v-icon>mdi-pencil-circle-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="deleteQualification(qualification.qualification_id)"
              >
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
export default {
  name: "experience-list",
  data() {
    return {};
  },
  computed: {}
};
</script>
