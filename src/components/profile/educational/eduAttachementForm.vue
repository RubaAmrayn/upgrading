<template>
  <div>
    <v-form lazy-validation ref="form">
      <v-file-input
        v-model="files"
        color="deep-purple accent-4"
        counter
        label="مرفقات المؤهل"
        multiple
        placeholder=""
        outlined
        :show-size="1000"
        :loading="connectionState"
        :disabled="connectionState"
        :messages="[() => (connectionState ? 'جاري الرفع...' : '')]"
        @change="upload"
      >
        <template v-slot:selection="{ index, text, file }">
          <v-chip color="deep-purple accent-4" dark outlined label>
            <v-icon>{{ getIconType(file) }}</v-icon>
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "edu-attachement-form",
  props: {
    qualification_id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      files: [],
      connectionState: false
    };
  },
  methods: {
    getIconType(f) {
      if (f.type.split("/").includes("image")) {
        return "mdi-file-image-outline";
      } else if (f.type.split("/").includes("pdf")) {
        return "mdi-file-pdf-outline";
      } else {
        return "mdi-file";
      }
    },
    upload() {
      if (this.files.length > 0) {
        this.connectionState = true;
        this.$store
          .dispatch("uplaodEducationalAttachement", {
            files: this.files,
            qualification_id: this.qualification_id
          })
          .then(res => {
            this.connectionState = false;
            this.files = [];
            if (res == "uploaded") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: "تم الرفع",
                body: "تم رفع مرفقاتك بنجاح"
              });
            }
          });
      }
    }
  }
};
</script>

<style>
form
  > div
  > div.v-input__control
  > div.v-text-field__details
  > div.v-messages
  > div {
  font-size: 1rem;
}
</style>
