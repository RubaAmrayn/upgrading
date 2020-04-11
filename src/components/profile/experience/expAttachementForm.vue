<template>
  <div>
    <v-form lazy-validation ref="form">
      <v-file-input
        v-model="files"
        color="deep-purple accent-4"
        counter
        :label="expAttach"
        multiple
        placeholder=""
        outlined
        :show-size="1000"
        :loading="connectionState"
        :disabled="connectionState"
        :messages="[() => (connectionState ? 'eduUpload' : '')]"
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
  name: "exp-attachement-form",
  props: {
    experience_id: {
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
  computed: {
    expAttach() {
      return this.$vuetify.lang.t("$vuetify.Experience.expAttach");
    },
    eduUpload() {
      return this.$vuetify.lang.t("$vuetify.Educational.eduUpload");
    },
    uploadTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.uploadTitle");
    },
    uploadBody() {
      return this.$vuetify.lang.t("$vuetify.Educational.uploadBody");
    }
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
          .dispatch("uplaodExperienceAttachement", {
            files: this.files,
            experience_id: this.experience_id
          })
          .then(res => {
            this.connectionState = false;
            this.files = [];
            if (res == "uploaded") {
              this.$root.$emit("show-alert", {
                status: "success",
                title: this.uploadTitle,
                body: this.uploadBody
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
