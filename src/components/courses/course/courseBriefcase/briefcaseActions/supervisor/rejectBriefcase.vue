<template>
  <!-- <v-menu
    :close-on-content-click="false"
    :nudge-width="400"
    offset-x
    v-model="menu"
    top
  >
    <template v-slot:activator="{ on }">
     
    </template> -->
  <v-card flat :loading="connectionState" :disabled="connectionState">
    <v-card-title class="primary-title justify-center">
      رفض الحقيبة
      <!-- <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn> -->
    </v-card-title>
    <v-card-text>
      <v-form lazy-validation ref="form">
        <v-textarea
          rows="3"
          auto-grow
          label="اسباب الرفض"
          outlined
          required
          :rules="[v => !!v || 'يجب عليك القيام بكتابة اسباب الرفض']"
          prepend-inner-icon="mdi-text"
          v-model="rejection.reasons"
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row justify="space-between">
        <v-col cols="3">
          <v-btn
            color="error"
            depressed
            @click="RejectBriefcase"
            class="text-start"
            block
          >
            إرسال
            <v-icon class="px-1">mdi-cancel</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn
            text
            @click="$root.$emit('show-controlls')"
            class="text-end"
            block
            >تراجع</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  <!-- </v-menu> -->
</template>

<script>
export default {
  name: "reject-briefcase",
  inject: ["course"],
  data() {
    return {
      connectionState: false,
      rejection: {
        reasons: ""
      },
      menu: false
    };
  },
  methods: {
    RejectBriefcase() {
      if (this.$refs.form.validate()) {
        this.connectionState = true;
        this.$store
          .dispatch("rejectBriefcase", {
            course_id: this.course.course_id,
            reasons: this.rejection.reasons
          })
          .then(res => {
            if (res == "rejected") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: "تم الرفض ",
                body: "تم رفض الحقيبة"
              });
            }
          });
      }
    }
  }
};
</script>
