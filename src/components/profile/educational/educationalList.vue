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
      :shaped="!isReadOnly"
      class="pa-2 mb-1"
      style="border-right: 3px solid var(--v-primary-base)"
    >
      <template>
        <v-row justify="center" class="px-2">
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="subtitle-1 text-center">
              {{ qualifTitle }}
            </div>
            <div class="subtitle-2 text-center">
              {{ qualification.ar_title }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="subtitle-1 text-center">
              {{ gradYear }}
            </div>
            <div class="subtitle-2 text-center">
              {{ qualification.graduation_year }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="subtitle-1 text-center">
              {{ eduPlace }}
            </div>
            <div class="subtitle-2 text-center">
              {{ qualification.universty_name }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" xl="3">
            <div class="subtitle-1 text-center" v-if="isReadOnly">
              {{ FolderAttachements }}
            </div>
            <div class="subtitle-1 text-center" v-else>
              {{ qualificationEvents }}
            </div>
            <div class="subtitle-2 text-center">
              <v-dialog
                max-width="650"
                transition="slide-y-transition"
                origin="top bottom"
                v-if="!isReadOnly"
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
                v-if="!isReadOnly"
              >
                <v-icon>mdi-delete-circle-outline</v-icon>
              </v-btn>
              <!-- attachement container -->
              <edu-attachement-container
                :qualification_id="qualification.qualification_id"
                :isReadOnly="isReadOnly"
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
  props: {
    choosenUserId: {
      type: Number,
      default: 0,
      required: false
    },
    isReadOnly: {
      type: Boolean,
      default: false,
      required: false
    }
  },
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
    FolderAttachements() {
      return this.$vuetify.lang.t("$vuetify.Educational.folderAttachements");
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
        title: self.deleteTitle,
        body: self.deleteBody,
        action: "deletEducationalOneQualifications",
        data: qualification_id,
        onSuccess() {
          self.$root.$emit("show-alert", {
            status: "success",
            title: self.deleteSuccessTitle,
            body: self.deleteSuccessBody
          });
        },
        onError(err) {
          self.$root.$emit("show-alert", {
            status: "error",
            title: self.deleteErrorTitle,
            body: err
          });
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("getEducationalOneQualifications", this.choosenUserId);
    // this.$root.$on("close-educational-form", () => (this.showDialog = false));
  },
  destroyed() {
    this.$root.$off("close-educational-form");
  }
};
</script>

<style></style>
