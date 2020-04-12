<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="10" lg="10" xl="10">
      <v-card>
        <v-card-title primary-title>
          جدول الطلبات الفعالة
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="getAllActiveTraineeRequests"
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
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                color="success"
                @click="
                  AcceptTrainee(item.request_id, item.user_id, item.first_name)
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
                    <v-expansion-panel-header>
                      المؤهلات
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
                      الخبرات
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
// import requestTrainee from "@/store/requestTrainee";
// import icon from "./icon.svg";
import { mapGetters } from "vuex";
export default {
  name: "active-trainee-requests",
  components: {
    "reject-trainee": () =>
      import("@/components/traineeRequests/rejectTrainee"),
    "educational-list": () =>
      import("@/components/profile/educational/educationalList"),
    "experience-list": () =>
      import("@/components/profile/experience/experienceList")
  },
  data() {
    return {
      expanded: [],
      selectedUser_id: 0,
      headers: [
        {
          text: "الإسم الأول",
          value: "first_name",
          align: "center",
          sortable: true
        },
        {
          text: "الاسم الثاني",
          value: "middle_name",
          align: "center",
          sortable: true
        },
        {
          text: "الاسم الاخير",
          value: "last_name",
          align: "center",
          sortable: true
        },
        {
          text: "تاريخ الطلب",
          value: "date_reqeust",
          align: "center",
          sortable: true
        },
        {
          text: "حالة الطلب",
          value: `status_id`,
          align: "center",
          sortable: true
        },
        {
          text: "الاحداث",
          value: "actions",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getAllActiveTraineeRequests"])
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("getAllActiveTraineeRequest");
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
        return "جديد";
      } else if (id == 2) {
        return "معلق";
      }
    },
    AcceptTrainee(request_id, user_id, first_name) {
      let data = { request_id, user_id };
      this.$store.dispatch("AcceptTrainee", data).then(res => {
        if (res == "Upgraded") {
          this.$root.$emit("show-alert", {
            status: "success",
            title: "تم القبول",
            body: ` تم قبول ${first_name} ك مدرب`
          });
        }
      });
    }
  }
  //   created() {
  //     this.$store.registerModule("requests", requestTrainee);
  //   },
  //   beforeDestroy() {
  //     this.$store.unregisterModule("requests");
  //   }
};
</script>

<style>
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
