<template>
  <v-dialog max-width="650" transition="slide-y-transition" origin="top bottom">
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
        <edu-attachement-form></edu-attachement-form>
        <!-- edu attach list -->
        <edu-attachement-list></edu-attachement-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import eduAttachementForm from "./eduAttachementForm";
import eduAttachementList from "./eduAttachementList";
export default {
  name: "edu-attachement-vue",
  components: {
    "edu-attachement-form": eduAttachementForm,
    "edu-attachement-list": eduAttachementList
  }
};
</script>
