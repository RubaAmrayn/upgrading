<template>
  <div>
    <v-card flat>
      <v-card-text>
        <infoPerson-details></infoPerson-details>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "info-person",
  components: {
    "infoPerson-details": () =>
      import("@/components/profile/infoPerson/infoPersonDetails")
  },
  data() {
    return {
      infoDialog: false
    };
  }
};
</script>
