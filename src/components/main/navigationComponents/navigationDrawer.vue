<template>
  <v-navigation-drawer app right v-model="drawer" width="200">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title text-center">
          {{ $vuetify.lang.t("$vuetify.Pages.AppName") }}
          <!-- <v-img
            class="align-end"
            src="@/assets/upgrad.jpg"
            contain
            aspect-ratio="3.14"
          ></v-img> -->
        </v-list-item-title>
        <!-- <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle> -->
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav color="primary--text">
      <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
        <v-list-item-icon class="ml-4">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "navigation-drawer",
  data() {
    return {
      drawer: true,
      items: []
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  async mounted() {
    let links = [];
    if (this.getUser.role_id == 1) {
      links = await import("@/links/trainee");
      this.items = links.default;
    } else if (this.getUser.role_id == 2) {
      links = await import("@/links/trainer");
      this.items = links.default;
    } else if (this.getUser.role_id == 3) {
      links = await import("@/links/supervisor");
      this.items = links.default;
    }
    this.$root.$on("navigationDrawer", () => (this.drawer = !this.drawer));
  }
};
</script>

<style></style>
