<template>
  <div>
    <v-row justify="start">
      <v-col cols="12" sm="8" md="6" lg="6">
        <v-alert type="info" border="top" colored-border>
          يجب عليك إضافة مؤهلاتك و خبراتك الشخصية قبل طلب الإلتحاق
        </v-alert>
      </v-col>
    </v-row>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>الملف الشخصي</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon class="text-start">mdi-account</v-icon>
          <span class="text-end">
            المعلومات الشخصية
          </span>
        </v-tab>
        <v-tab>
          <v-icon class="text-start">mdi-lock</v-icon>
          <span class="text-end">
            المؤهلات العلمية
          </span>
        </v-tab>
        <v-tab>
          <v-icon class="text-start">mdi-access-point</v-icon>
          <span class="text-end">
            الخبرات الشخصية
          </span>
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- user information -->
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <!-- educational qualification card -->
          <educational-qualification></educational-qualification>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- experinces card -->
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "profile-view",
  components: {
    "educational-qualification": () => import("./educationalQualification")
  }
};
</script>
