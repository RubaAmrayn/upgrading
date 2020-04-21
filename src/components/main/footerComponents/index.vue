<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="pramiry">
        <v-spacer></v-spacer>
        <strong class="subheading">للاستفسار الرجاء التواصل عبر </strong>
        <v-spacer></v-spacer>
        <v-btn v-for="icon in icons" :key="icon" class="mx-6" dark icon>
          <v-icon size="28px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>upgrading</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-email", "mdi-twitter"]
  })
};
</script>
