<template>
  <v-dialog width="600">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-image-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="primary-title justify-center">
        {{ course.course_name }}
      </v-card-title>
      <v-card-text>
        <v-card width="200px" class="mx-auto">
          <v-img :src="posterPath" :aspect-ratio="1" contain></v-img>
        </v-card>
        <v-row>
          <v-col cols="12">
            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/jpg"
              :messages="massageUplodeImage"
              prepend-icon="mdi-camera-image"
              :label="labelImage"
              outlined
              :show-size="1000"
              counter-size
              color="primary"
              counter
              :loading="connectionState"
              :disabled="connectionState"
              v-model="file"
              @change="upload"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "poster-image",
  props: ["course"],
  data() {
    return {
      rules: [value => !value || value.size < 2000000 || this.vaildateImage],
      connectionState: false,
      file: undefined
    };
  },
  computed: {
    posterPath() {
      if (this.course && this.course.poster_path) {
        return "/public/" + this.course.poster_path;
      } else {
        return require("@/assets/upgrad.jpg");
      }
    },
    massageUplodeImage() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.massageUplodeImage");
    },
    labelImage() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.labelImage");
    },
    vaildateImage() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.vaildateImage");
    },
    uplodeTitle() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.uplodeTitle");
    },
    uplodeBody() {
      return this.$vuetify.lang.t("$vuetify.PosterAction.uplodeBody");
    },
    uplodeConfirmButtonText() {
      return this.$vuetify.lang.t(
        "$vuetify.PosterAction.uplodeConfirmButtonText"
      );
    }
  },
  methods: {
    upload() {
      if (this.file != undefined) {
        this.connectionState = true;
        let payload = {};
        payload["course_id"] = this.course.course_id;
        payload["file"] = this.file;
        this.$store.dispatch("uploadPoster", payload).then(res => {
          if (res == "PosterUpdated") {
            this.$root.$emit("show-alert", {
              status: "success",
              title: this.uplodeTitle,
              body: this.uplodeBody,
              confirmButtonText: this.uplodeConfirmButtonText
            });
          }
          this.connectionState = false;
        });
      }
    }
  }
};
</script>

<style></style>
