<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="10" lg="10" xl="10">
      <v-card>
        <v-card-title primary-title>
          جدول الطلبات المؤرشفة
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="getAllArchiveTraineeRequests"
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
  name: "archive-trainee-requests",
  components: {
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
          text: "التعليق",
          value: "notes",
          align: "center",
          sortable: false
        },
        {
          text: "حالة الطلب",
          value: `status_id`,
          align: "center",
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getAllArchiveTraineeRequests"])
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("getAllArchiveTraineeRequest");
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
        return "مرفوض";
      } else if (id == 4) {
        return "تم القبول";
      }
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
