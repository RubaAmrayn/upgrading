<template>
  <div>
    <v-card
      v-if="getExperinces.length == 0"
      class="pa-3 mb-1"
      style="border-right: 3px solid var(--v-info-base)"
      flat
    >
      <div class="title text-center">
        {{ experNo }}
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
              {{ experience_name }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.experince_name }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title center-text">
              {{ experStart }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ new Date(experience.start_date).toLocaleDateString("en-sa") }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title center-text">
              {{ experEnd }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ new Date(experience.end_date).toLocaleDateString("en-sa") }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              {{ experType }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.ar_experince_type }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              {{ experLevel }}
            </div>
            <div class="subtitle-1 justify-center">
              {{ experience.ar_exp_level }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" xl="2">
            <div class="title justify-center">
              {{ qualificationEvents }}
            </div>
            <div class="subtitle-1 justify-center">
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
                <experience-form
                  method="Update"
                  :experience_id="experience.experince_id"
                ></experience-form>
              </v-dialog>

              <v-btn icon @click="deleteExperince(experience.experince_id)">
                <v-icon>mdi-delete-circle-outline</v-icon>
              </v-btn>
              <exp-attachement-container
                :experience_id="experience.experince_id"
              ></exp-attachement-container>
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
  components: {
    "exp-attachement-container": () => import("./expAttachementContainer"),
    "experience-form": () => import("./experienceForm")
  },
  data() {
    return {
      showDialog: false
    };
  },
  computed: {
    experNo() {
      return this.$vuetify.lang.t("$vuetify.Experience.experNo");
    },
    experience_name() {
      return this.$vuetify.lang.t("$vuetify.Experience.experience_name");
    },
    experStart() {
      return this.$vuetify.lang.t("$vuetify.Experience.experStart");
    },
    experEnd() {
      return this.$vuetify.lang.t("$vuetify.Experience.experEnd");
    },
    experType() {
      return this.$vuetify.lang.t("$vuetify.Experience.experType");
    },
    experLevel() {
      return this.$vuetify.lang.t("$vuetify.Experience.experLevel");
    },
    qualificationEvents() {
      return this.$vuetify.lang.t("$vuetify.Educational.qualificationEvents");
    },
    ...mapGetters(["getExperinces"])
  },
  methods: {
    deleteExperince(experince_id) {
      let self = this;
      this.$root.$emit("show-alert", {
        status: "confirm",
        title: "هل انت متأكد؟",
        body: "هل أنت متأكد من حذف الخبرة؟",
        action: "deleteOneExperience",
        data: experince_id,
        onSuccess(res) {
          if (res == "deleted") {
            self.$root.$emit("show-alert", {
              status: "success",
              title: "تم الحذف",
              body: "تم حذف الخبرة و مرفقاتها"
            });
          }
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("getOneUserExperience");
    // this.$root.$on("close-experince-form", () => (this.showDialog = false));
  },
  destroyed() {
    // this.$root.$off("close-experince-form");
  }
};
</script>
