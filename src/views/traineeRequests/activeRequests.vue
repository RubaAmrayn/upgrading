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
            :items="getAllTraineeRequests"
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
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="px-1">
                <v-subheader>المؤهلات</v-subheader>
                <v-divider></v-divider>
                <educational-list
                  :choosenUserId="item.user_id"
                  :isReadOnly="true"
                ></educational-list>
                <v-subheader>الخبرات</v-subheader>
                <v-divider></v-divider>
                <experience-list
                  :choosenUserId="item.user_id"
                  :isReadOnly="true"
                ></experience-list>
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
import { mapGetters } from "vuex";
export default {
  name: "active-trainee-requests",
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
    ...mapGetters(["getAllTraineeRequests"])
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

<style></style>
