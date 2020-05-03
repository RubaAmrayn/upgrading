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
  <v-card flat>
    <v-card-title class="primary-title justify-center">
      تعليق الحقيبة
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
          label="اسباب التعليق"
          outlined
          required
          :rules="[v => !!v || 'يجب عليك القيام بكتابة اسباب التعليق']"
          prepend-inner-icon="mdi-text"
          v-model="hold.reasons"
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row justify="space-between">
        <v-col cols="3">
          <v-btn
            color="secondary"
            depressed
            @click="HoldBriefcase"
            class="text-start"
            block
          >
            إرسال
            <v-icon class="px-1">mdi-pause</v-icon>
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
  name: "hold-briefcase",
  props: ["course"],
  data() {
    return {
      hold: {
        reasons: ""
      },
      menu: false
    };
  },
  methods: {
    HoldBriefcase() {
      if (this.$refs.form.validate()) {
        this.connectionState = true;
        this.$store
          .dispatch("HoldBriefcase", {
            course_id: this.course.course_id,
            reasons: this.hold.reasons
          })
          .then(res => {
            if (res == "holded") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: "تم التعليق ",
                body: "تم تعليق الحقيبة"
              });
            }
          });
      }
    }
  }
};
</script>
