<template>
  <v-dialog>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-image-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title primary-title>
        Upload Poster
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "poster-image"
};
</script>

<style></style>
