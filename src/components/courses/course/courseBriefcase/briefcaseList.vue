<template>
  <v-list v-if="getBriefcases.length > 0">
    <v-list-item v-for="(briefcase, i) in getBriefcases" :key="i">
      <v-list-item-icon>
        <v-icon>mdi-zip-box</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          v-text="briefcase.briefcase_title"
        ></v-list-item-title>
        <v-list-item-subtitle
          v-text="briefcase.publish_date"
        ></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn
          icon
          @click="
            downloadAttchement(
              briefcase.briefcase_path,
              briefcase.briefcase_original_name
            )
          "
        >
          <v-icon>mdi-file-download-outline</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action
        v-if="
          isTrainer &&
            getUser.user_id === course.user_id &&
            ![3, 4, 5, 9].includes(course.current_status)
        "
      >
        <v-btn icon @click="delete_attachement(briefcase.briefcase_id)">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
  <v-card flat v-else>
    <v-card-title class="primary-title justify-center">
      {{ noBriefcase }}
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "briefcase-list",
  props: ["course"],
  computed: {
    ...mapGetters(["getBriefcases", "isTrainer", "getUser"]),

    noBriefcase() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.noBriefcase");
    },
    deleteBriefcaseTitle() {
      return this.$vuetify.lang.t(
        "$vuetify.BriefcaseTrainer.deleteBriefcaseTitle"
      );
    },
    deleteBriefcaseBody() {
      return this.$vuetify.lang.t(
        "$vuetify.BriefcaseTrainer.deleteBriefcaseBody"
      );
    },
    deleteConfirmText() {
      return this.$vuetify.lang.t(
        "$vuetify.BriefcaseTrainer.deleteConfirmText"
      );
    },
    rejectText() {
      return this.$vuetify.lang.t("$vuetify.BriefcaseTrainer.rejectText");
    },
    deleteSuccessTitle() {
      return this.$vuetify.lang.t(
        "$vuetify.BriefcaseTrainer.deleteSuccessTitle"
      );
    },
    deleteSuccessBody() {
      return this.$vuetify.lang.t(
        "$vuetify.BriefcaseTrainer.deleteSuccessBody"
      );
    }
  },
  methods: {
    downloadAttchement(path, name) {
      let anchorElement = document.createElement("a");
      anchorElement.href = `/public/${path}`;
      anchorElement.download = name;
      anchorElement.click();
    },
    delete_attachement(briefcase_id) {
      let payload = {
        briefcase_id,
        course_id: this.course.course_id
      };

      {
        let self = this;
        this.$root.$emit("show-alert", {
          status: "confirm",
          title: self.deleteBriefcaseTitle,
          body: self.deleteBriefcaseBody,
          confirmButtonText: self.deleteConfirmText,
          rejectButtonText: self.rejectText,
          data: payload,
          action: "deleteOneBriefcase",
          onSuccess() {
            self.$root.$emit("show-alert", {
              status: "success",
              title: self.deleteSuccessTitle,
              body: self.deleteSuccessBody
            });
          }
        });
      }
    }
  }
};
</script>
