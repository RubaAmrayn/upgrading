<template>
  <v-dialog transition="scroll-y-transition" v-model="dialog" width="350">
    <v-card>
      <div class="text-center pa-3">
        <v-icon
          size="90"
          :color="payload.status"
          v-if="payload.status == 'success'"
        >
          mdi-checkbox-marked-circle-outline
        </v-icon>
        <v-icon
          size="90"
          :color="payload.status"
          v-else-if="payload.status == 'error'"
        >
          mdi-close-circle-outline
        </v-icon>
      </div>
      <v-card-title class="headline justify-center pt-2">
        {{ payload.title }}
      </v-card-title>
      <v-card-text class="pb-2 pt-2">
        <h3 class="text-center">
          {{ payload.body }}
        </h3>
      </v-card-text>

      <v-card-actions>
        <v-container fluid class="pb-0 pt-2">
          <v-row justify="center">
            <v-col cols="4">
              <v-btn
                depressed
                block
                :color="payload.status"
                @click="$root.$emit('close-alert')"
              >
                OK
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "alert-view",
  props: {
    payload: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: true
    };
  }
};
</script>

<style></style>
