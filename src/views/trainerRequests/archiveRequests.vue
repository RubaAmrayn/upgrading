<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="10" lg="10" xl="10">
      <v-card>
        <v-card-title primary-title>
          {{ archiveOrder }}
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="getAllArchiveTrainerRequests"
            show-expand
            single-expand
            :expanded.sync="expanded"
            item-key="user_id"
          >
            <template v-slot:item.date_reqeust="{ value }">
              {{ new Date(value).toLocaleString("en-sa") }}
            </template>
            <template v-slot:item.status_id="{ value }">
              <v-chip class="ma-2 px-3" :color="StatusColor(value)">
                {{ StatusName(value) }}
              </v-chip>
            </template>
            <template v-slot:item.notes="{ value }">
              <v-tooltip bottom v-if="!!value && value.length > 20">
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    {{ truncatedText(value) }}
                  </div>
                </template>
                <span>{{ value }}</span>
              </v-tooltip>
              <span v-else> {{ value || "-" }}</span>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="px-1">
                <v-expansion-panels accordion focusable hover>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      {{ qualification }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content style="padding: 0 !important;">
                      <educational-list
                        :choosenUserId="item.user_id"
                        :isReadOnly="true"
                      ></educational-list>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      {{ experience }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pa-0">
                      <experience-list
                        :choosenUserId="item.user_id"
                        :isReadOnly="true"
                      ></experience-list>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </td>
            </template>
          </v-data-table>
          <div class="py-3"></div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import requestTrainer from "@/store/requestTrainer";
// import { registerModule, unRegisterModule } from "@/mixins/vuexDynamicModules";
import { mapGetters } from "vuex";
export default {
  name: "archive-trainer-requests",
  components: {
    "educational-list": () =>
      import("@/components/profile/educational/educationalList"),
    "experience-list": () =>
      import("@/components/profile/experience/experienceList")
  },
  // mixins: [registerModule, unRegisterModule],
  data(vm) {
    vm.$nextTick(() => {
      vm.headers = [
        {
          text: vm.FirstNameLabel,
          value: "first_name",
          align: "center",
          sortable: true
        },
        {
          text: vm.MiddleNameLabel,
          value: "middle_name",
          align: "center",
          sortable: true
        },
        {
          text: vm.LastNameLabel,
          value: "last_name",
          align: "center",
          sortable: true
        },
        {
          text: vm.dateOrder,
          value: "date_reqeust",
          align: "center",
          sortable: true
        },
        {
          text: vm.comments,
          value: "notes",
          align: "center",
          sortable: false
        },
        {
          text: vm.orderStatus,
          value: `status_id`,
          align: "center",
          sortable: true
        }
      ];
    });
    return {
      expanded: [],
      selectedUser_id: 0
    };
  },
  computed: {
    archiveOrder() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.archiveOrder");
    },
    experience() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.experience");
    },
    qualification() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.qualification");
    },
    orderStatus() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.orderStatus");
    },
    dateOrder() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.dateOrder");
    },
    FirstNameLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.firstNameLabel");
    },
    MiddleNameLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.middleNameLabel");
    },
    LastNameLabel() {
      return this.$vuetify.lang.t("$vuetify.Sign.lastNameLabel");
    },
    qualificationEvents() {
      return this.$vuetify.lang.t("$vuetify.Educational.qualificationEvents");
    },
    comments() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.comments");
    },
    okOrderTitle() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.okOrderTitle");
    },
    reject() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.reject");
    },
    ...mapGetters(["getAllArchiveTrainerRequests"])
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("getAllArchiveTrainerRequest");
    });
  },
  methods: {
    truncatedText(text) {
      return [...text].splice(0, 20).join("") + "...";
    },
    StatusColor(id) {
      if (id == 3) {
        return "error";
      } else {
        return "success";
      }
    },
    StatusName(id) {
      if (id == 3) {
        return this.reject;
      } else if (id == 4) {
        return this.okOrderTitle;
      }
    }
  }
  // created() {
  //   this.registerStoreModule("requestTrainer", requestTrainer);
  // }
  // ,
  // beforeDestroy() {
  //   this.unRegisterStoreModule("requestTrainer");
  // }
};
</script>

<style>
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
