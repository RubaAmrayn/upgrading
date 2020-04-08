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
        مرفقات المؤهل
      </v-card-title>
      <v-card-text>
        <!-- edu attach form -->
        <edu-attachement-form
          :qualification_id="qualification_id"
          v-if="dialog"
        ></edu-attachement-form>
        <!-- edu attach list -->
        <edu-attachement-list
          :qualification_id="qualification_id"
          v-if="dialog"
        ></edu-attachement-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "edu-attachement-vue",
  props: {
    qualification_id: {
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
    "edu-attachement-form": () => import("./eduAttachementForm"),
    "edu-attachement-list": () => import("./eduAttachementList")
  }
};
</script>
