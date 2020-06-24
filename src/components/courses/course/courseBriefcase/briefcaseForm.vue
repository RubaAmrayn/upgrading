<template>
  <v-card flat :loading="connectionState" :disabled="connectionState">
    <v-card-subtitle class="primary-title">
      <v-row justify="space-between" class="px-2">
        <span class="text-start"> {{ uplodeBriefcase }}</span>
        <a href="" class="text-end">{{ standardRead }}</a>
      </v-row>
    </v-card-subtitle>
    <v-card-text>
      <v-form lazy-validation ref="briefcasForm">
        <v-text-field
          outlined
          :label="briefcaseTitle"
          v-model="briefcase.title"
        ></v-text-field>
        <v-file-input
          :rules="rules"
          accept="application/zip, application/gzip,application/rar, application/x-rar-compressed, application/x-tar, application/x-7z-compressed"
          :label="selectBriefcase"
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
            >{{ btnBriefcase }}</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "briefcase-form",
  props: ["course"],
  data() {
    return {
      connectionState: false,
      briefcase: {
        title: "",
        file: undefined
      },
      rules: [value => !value || value.size < 20971520 || this.sizeBriefcase]
    };
  },
  computed: {
    uplodeBriefcase() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.uplodeBriefcase");
    },
    briefcaseTitle() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.briefcaseTitle");
    },
    standardRead() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.standardRead");
    },
    selectBriefcase() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.selectBriefcase");
    },
    btnBriefcase() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.btnBriefcase");
    },
    sizeBriefcase() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.sizeBriefcase");
    },
    uplodeTitle() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.uplodeTitle");
    },
    uplodeBody() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.uplodeBody");
    },
    confirmText() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.confirmText");
    }
  },
  methods: {
    Upload() {
      this.connectionState = true;
      this.briefcase["course_id"] = this.course.course_id;
      this.briefcase["current_status"] = this.course.current_status;
      this.$store.dispatch("uploadOneBriefcase", this.briefcase).then(res => {
        if (res == "uploaded") {
          this.$root.$emit("show-alert", {
            status: "success",
            title: this.uplodeTitle,
            body: this.uplodeBody,
            confirmButtonText: this.confirmText
          });
          this.connectionState = false;
        }
      });
    }
  }
};
</script>
