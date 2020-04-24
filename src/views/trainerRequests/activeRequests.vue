<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="10" lg="10" xl="10">
      <v-card>
        <v-card-title primary-title>{{ activeOrder }}</v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="getAllActiveTrainerRequests"
            show-expand
            single-expand
            :expanded.sync="expanded"
            item-key="user_id"
          >
            <template v-slot:item.date_reqeust="{ value }">{{
              new Date(value).toLocaleString("en-sa")
            }}</template>
            <template v-slot:item.status_id="{ value }">
              <v-chip class="ma-2 px-3" :color="StatusColor(value)">{{
                StatusName(value)
              }}</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                color="success"
                @click="
                  AcceptTrainer(item.request_id, item.user_id, item.first_name)
                "
                class="text-start"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <reject-trainee
                :request_id="item.request_id"
                :first_name="item.first_name"
              ></reject-trainee>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="px-1">
                <v-expansion-panels accordion focusable hover>
                  <v-expansion-panel>
                    <v-expansion-panel-header>{{
                      qualification
                    }}</v-expansion-panel-header>
                    <v-expansion-panel-content style="padding: 0 !important;">
                      <educational-list
                        :choosenUserId="item.user_id"
                        :isReadOnly="true"
                      ></educational-list>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>{{
                      experience
                    }}</v-expansion-panel-header>
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
// import icon from "./icon.svg";
import { mapGetters } from "vuex";
export default {
  name: "active-trainer-requests",
  components: {
    "reject-trainee": () =>
      import("@/components/trainerRequests/rejectTrainer"),
    "educational-list": () =>
      import("@/components/profile/educational/educationalList"),
    "experience-list": () =>
      import("@/components/profile/experience/experienceList")
  },
  //  mixins: [registerModule, unRegisterModule],
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
          text: vm.orderStatus,
          value: `status_id`,
          align: "center",
          sortable: true
        },
        {
          text: vm.qualificationEvents,
          value: "actions",
          align: "center",
          sortable: false
        }
      ];
    });
    return {
      headers: [],
      expanded: [],
      selectedUser_id: 0
    };
  },
  computed: {
    activeOrder() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.activeOrder");
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
    newOrder() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.newOrder");
    },
    hangOrder() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.hangOrder");
    },
    okOrderTitle() {
      return this.$vuetify.lang.t("$vuetify.activeRequest.okOrderTitle");
    },
    ...mapGetters(["getAllActiveTrainerRequests"])
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("getAllActiveTrainerRequest");
    });
  },
  methods: {
    StatusColor(id) {
      if (id == 6) {
        return "info";
      } else {
        return "secondary";
      }
    },
    StatusName(id) {
      if (id == 6) {
        return this.newOrder;
      } else if (id == 2) {
        return this.hangOrder;
      }
    },
    AcceptTrainer(request_id, user_id, first_name) {
      let data = { request_id, user_id };
      this.$store.dispatch("AcceptTrainer", data).then(res => {
        if (res == "Upgraded") {
          this.$root.$emit("show-alert", {
            status: "success",
            title: this.okOrderTitle,
            body: this.$vuetify.lang.t(
              "$vuetify.activeRequest.okOrderBody",
              first_name
            )
          });
        }
      });
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
