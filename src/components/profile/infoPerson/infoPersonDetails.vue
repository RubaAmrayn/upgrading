<template>
  <div class=" text-center justify-center">
    <v-scroll-y-transition mode="out-in">
      <div
        v-if="!getUser"
        class="title grey--text text--lighten-1 font-weight-light"
        style="align-self: center;"
      >
        Error No Data
      </div>
      <v-card v-else class="" flat>
        <v-card-text>
          <h3 class="headline mb-2">
            {{
              `${getUser.first_name} ${getUser.middle_name} ${getUser.last_name}`
            }}
            <v-dialog
              max-width="650"
              transition="slide-y-transition"
              origin="top bottom"
              v-model="infoDialog"
            >
              <template #activator="{ on }">
                <v-btn icon color="primary" v-on="on">
                  <v-icon large>mdi-pencil-circle-outline</v-icon>
                </v-btn>
              </template>
              <infoPerson-form></infoPerson-form>
            </v-dialog>
          </h3>
          <div class="blue--text mb-2">{{ getUser.email }}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-row justify="center">
          <v-col cols="2">
            <div class="text-start">
              اسم المستخدم:
            </div>
          </v-col>
          <v-col cols="2">
            <div class="text-start blue--text subheading font-weight-bold">
              {{ getUser.username }}
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="2">
            <div class="text-start">
              تاريخ الميلاد:
            </div>
          </v-col>
          <v-col cols="2">
            <div class="text-start blue--text subheading font-weight-bold">
              {{ new Date(getUser.date_of_birth).toLocaleDateString("en-sa") }}
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="2">
            <div class="text-start">
              رقم الجوال:
            </div>
          </v-col>
          <v-col cols="2">
            <div class="text-start blue--text subheading font-weight-bold">
              {{ getUser.phone }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-scroll-y-transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "info-person-details",
  components: {
    "infoPerson-form": () =>
      import("@/components/profile/infoPerson/infoPersonForm")
  },
  data() {
    return {
      infoDialog: false
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    this.$root.$on("info-Dialog", () => (this.infoDialog = !this.infoDialog));
  },
  destroyed() {
    this.$root.$off("info-Dialog");
  }
};
</script>

<style></style>
