<template>
  <v-dialog
    :value="true"
    transition="scroll-y-transition"
    width="350"
    :overlay-color="overlayColor"
  >
    <v-card>
      <success-icon v-if="payload.status == 'success'"></success-icon>
      <error-icon v-else-if="payload.status == 'error'"></error-icon>
      <warning-icon
        v-else-if="payload.status == 'warning' || payload.status == 'confirm'"
      ></warning-icon>
      <info-icon v-else-if="payload.status == 'info'"></info-icon>
      <v-card-title class="headline justify-center pt-2" v-if="payload.title">
        {{ payload.title }}
      </v-card-title>
      <v-card-text class="pb-2 pt-2" v-if="payload.body">
        <h3 class="text-center">
          {{ payload.body }}
        </h3>
      </v-card-text>

      <v-card-actions>
        <v-container fluid class="pb-0 pt-2">
          <v-row justify="space-between" v-if="payload.status == 'confirm'">
            <v-col cols="4">
              <v-btn
                depressed
                block
                color="warning"
                @click="doConfirm"
                :loading="connectionState"
              >
                {{ payload.confirmButtonText || "OK" }}
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn depressed text @click="$root.$emit('close-alert')">
                {{ payload.rejectButtonText || "No" }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" v-else>
            <v-col cols="4">
              <v-btn
                depressed
                block
                :color="payload.confirmButtonClass || payload.status"
                @click="$root.$emit('close-alert')"
              >
                {{ payload.confirmButtonText || "OK" }}
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
  components: {
    "success-icon": () => import("./success-icon"),
    "error-icon": () => import("./error-icon"),
    "warning-icon": () => import("./warning-icon"),
    "info-icon": () => import("./info-icon")
  },
  data() {
    return {
      connectionState: false
    };
  },
  props: {
    payload: {
      type: Object,
      required: true
    }
  },
  computed: {
    overlayColor() {
      return this.payload.status == "confirm" ? "warning" : this.payload.status;
    }
  },
  methods: {
    doConfirm() {
      this.connectionState = true;
      let action = this.payload.action;
      let payload = this.payload.data;
      this.$store.dispatch(action, payload).then(res => {
        this.connectionState = false;
        this.$root.$emit("close-alert");
        let self = this;
        let response = res;
        setTimeout(function() {
          if (self.payload["onSuccess"]) {
            self.payload.onSuccess(response);
          }
        }, 50);
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
