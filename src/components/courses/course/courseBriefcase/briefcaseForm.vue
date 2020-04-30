<template>
  <v-card flat :loading="connectionState" :disabled="connectionState">
    <v-card-subtitle class="primary-title">
      <v-row justify="space-between" class="px-2">
        <span class="text-start"> رفع حقيبة</span>
        <a href="" class="text-end">إقرا المعايير</a>
      </v-row>
    </v-card-subtitle>
    <v-card-text>
      <v-form lazy-validation ref="briefcasForm">
        <v-text-field
          outlined
          label="عنوان الحقيبة"
          v-model="briefcase.title"
        ></v-text-field>
        <v-file-input
          :rules="rules"
          accept="application/zip, application/gzip,application/rar, application/x-rar-compressed, application/x-tar, application/x-7z-compressed"
          messages="اختر الحقيبة لرفعها"
          label="الحقيبة"
          outlined
          :show-size="1024"
          counter-size
          color="primary"
          counter
          v-model="briefcase.file"
        ></v-file-input>
      </v-form>
    </v-card-text>
    <v-card-actions class="py-0">
      <v-row>
        <v-col cols="4">
          <v-btn
            color="primary"
            depressed
            :loading="connectionState"
            block
            @click="Upload"
            >رفع الحقيبة</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "briefcase-form",
  inject: ["course"],
  data() {
    return {
      connectionState: false,
      briefcase: {
        title: "",
        file: undefined
      },
      rules: [
        value =>
          !value ||
          value.size < 20971520 ||
          "حجم الصورة يجب ان يكون اقل من 20 ميقابايت"
      ]
    };
  },
  methods: {
    Upload() {
      this.connectionState = true;
      this.briefcase["course_id"] = this.course.course_id;
      this.$store.dispatch("uploadOneBriefcase", this.briefcase).then(res => {
        if (res == "uploaded") {
          this.$root.$emit("show-alert", {
            status: "success",
            title: "تم الرفع",
            body: "تم رفع الحقيبة بنجاح",
            confirmButtonText: "حسناً"
          });
          this.connectionState = false;
        }
      });
    }
  }
};
</script>
