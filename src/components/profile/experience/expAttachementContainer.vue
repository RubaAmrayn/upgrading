<template>
  <v-dialog
    max-width="650"
    transition="slide-y-transition"
    origin="top bottom"
    v-model="dialog"
  >
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-folder-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="primary-title justify-center">
        مرفقات الخبرة
      </v-card-title>
      <v-card-text>
        <!-- exp attach form -->
        <exp-attachement-form
          :experience_id="experience_id"
          v-if="dialog"
        ></exp-attachement-form>
        <!-- exp attach list -->
        <exp-attachement-list
          :experience_id="experience_id"
          v-if="dialog"
        ></exp-attachement-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "exp-attachement-vue",
  props: {
    experience_id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  components: {
    "exp-attachement-form": () => import("./expAttachementForm"),
    "exp-attachement-list": () => import("./expAttachementList")
  }
};
</script>
