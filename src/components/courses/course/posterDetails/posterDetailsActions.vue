<template>
  <v-card-actions class="pa-0">
    <v-container class="py-0">
      <v-row justify="space-around">
        <v-col cols="4">
          <v-btn depressed color="primary">
            <v-icon>mdi-history</v-icon>
            <span>Recents</span>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn depressed color="primary">
            <v-icon>mdi-heart</v-icon>
            <span>Favorites</span>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn depressed color="primary">
            <v-icon>mdi-map-marker</v-icon>
            <span>Nearby</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card-actions>
</template>

<script>
export default {
  name: "poster-details-actions"
};
</script>
