<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="400"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn icon color="error" class="text-end" v-on="on">
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="primary-title justify-center">
        رفض طلب مدرب
      </v-card-title>
      <v-card-text>
        <v-form lazy-validation ref="form">
          <v-text-field
            label="الأسباب"
            outlined
            required
            :rules="[v => !!v || 'يجب كتابة اسباب الرفض']"
            prepend-inner-icon="mdi-text"
            v-model="notes"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="error"
          depressed
          @click="RejectTrainee"
          class="text-start"
        >
          رفض
          <v-icon>mdi-cancel</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="menu = false" class="text-end">الغاء</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "reject-trainer",
  props: {
    request_id: {
      type: Number,
      required: true
    },
    first_name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menu: false,
      notes: ""
    };
  },
  methods: {
    RejectTrainer() {
      if (this.$refs.form.validate()) {
        let data = { request_id: this.request_id, notes: this.notes };
        this.$store.dispatch("RejectTrainer", data).then(res => {
          if (res == "Rejected") {
            this.$root.$emit("show-alert", {
              status: "success",
              title: "تم الرفض",
              body: ` تم رفض طلب التحاق  ${this.first_name} ك مدرب`
            });
          }
        });
      }
    }
  }
};
</script>

<style></style>
