<template>
  <v-dialog transition="scroll-y-transition" v-model="dialog" width="350">
    <v-card>
      <div class="text-center pa-3">
        <sweetalert-icon
          :icon="payload.status"
          v-if="payload.status != 'confirm'"
        ></sweetalert-icon>
        <sweetalert-icon icon="warning" v-else></sweetalert-icon>
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
          <v-row justify="space-between" v-if="payload.status == 'confirm'">
            <v-col cols="4">
              <v-btn depressed block color="warning" @click="doConfirm">
                OK
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn depressed text @click="$root.$emit('close-alert')">
                No
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" v-else>
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
import SweetAlertIcon from "vue-sweetalert-icons";
export default {
  name: "alert-view",
  components: {
    "sweetalert-icon": SweetAlertIcon
  },
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
  },
  methods: {
    doConfirm() {
      let action = this.payload.action;
      let payload = this.payload.data;
      this.$store.dispatch(action, payload).then(res => {
        this.$root.$emit("close-alert");
        // eslint-disable-next-line no-prototype-builtins
        if (this.payload.hasOwnProperty("onSuccess")) {
          this.payload.onSuccess(res);
        }
      });
      // .catch(err => {
      //   // eslint-disable-next-line no-prototype-builtins
      //   if (this.payload.hasOwnProperty("onError")) {
      //     this.payload.onError(err);
      //   }
      // });
    }
  }
};
</script>

<style></style>
