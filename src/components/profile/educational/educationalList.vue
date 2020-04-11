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
            <div class="subtitle-1 justify-center">
              {{ qualifTitle }}
            </div>
            <div class="subtitle-2 justify-center">
              {{ qualification.ar_title }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="subtitle-1 center-text">
              {{ gradYear }}
            </div>
            <div class="subtitle-2 justify-center">
              {{ qualification.graduation_year }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="subtitle-1 justify-center">
              {{ eduPlace }}
            </div>
            <div class="subtitle-2 justify-center">
              {{ qualification.universty_name }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="subtitle-1 justify-center">
              {{ qualificationEvents }}
            </div>
            <div class="subtitle-2 justify-center">
              <v-dialog
                max-width="650"
                transition="slide-y-transition"
                origin="top bottom"
              >
                <template #activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-pencil-circle-outline</v-icon>
                  </v-btn>
                </template>
                <educational-form
                  method="Update"
                  :qualification_id="qualification.qualification_id"
                ></educational-form>
              </v-dialog>
              <v-btn
                icon
                @click="deleteQualification(qualification.qualification_id)"
              >
                <v-icon>mdi-delete-circle-outline</v-icon>
              </v-btn>
              <!-- attachement container -->
              <edu-attachement-container
                :qualification_id="qualification.qualification_id"
              ></edu-attachement-container>
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
  name: "educational-list",
  components: {
    "edu-attachement-container": () => import("./eduAttachementContainer"),
    "educational-form": () => import("./educationalForm")
  },
  data() {
    return {
      showDialog: false
    };
  },
  computed: {
    qualificationNo() {
      return this.$vuetify.lang.t("$vuetify.Educational.qualificationNo");
    },
    qualifTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.qualifTitle");
    },
    eduPlace() {
      return this.$vuetify.lang.t("$vuetify.Educational.eduPlace");
    },
    gradYear() {
      return this.$vuetify.lang.t("$vuetify.Educational.gradYear");
    },
    qualificationEvents() {
      return this.$vuetify.lang.t("$vuetify.Educational.qualificationEvents");
    },
    deleteTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.deleteTitle");
    },
    deleteBody() {
      return this.$vuetify.lang.t("$vuetify.Educational.deleteBody");
    },
    deleteSuccessTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.deleteSuccessTitle");
    },
    deleteSuccessBody() {
      return this.$vuetify.lang.t("$vuetify.Educational.deleteSuccessBody");
    },
    deleteErrorTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.deleteErrorTitle");
    },
    ...mapGetters(["getQualifications"])
  },
  methods: {
    deleteQualification(qualification_id) {
      let self = this;
      self.$root.$emit("show-alert", {
        status: "confirm",
        title: this.deleteTitle,
        body: this.deleteBody,
        action: "deletEducationalOneQualifications",
        data: qualification_id,
        onSuccess() {
          self.$root.$emit("show-alert", {
            status: "success",
            title: this.deleteSuccessTitle,
            body: this.deleteSuccessBody
          });
        },
        onError(err) {
          self.$root.$emit("show-alert", {
            status: "error",
            title: this.deleteErrorTitle,
            body: err
          });
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("getEducationalOneQualifications");
    // this.$root.$on("close-educational-form", () => (this.showDialog = false));
  },
  destroyed() {
    this.$root.$off("close-educational-form");
  }
};
</script>

<style></style>
