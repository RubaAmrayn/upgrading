<template>
  <v-list two-line flat>
    <v-subheader inset>{{ attach }}</v-subheader>
    <v-list-item-group
      color="primary"
      append-icon="mdi-folder"
      v-if="getEexperience_attachement.length > 0"
    >
      <v-list-item
        v-for="file in getEexperience_attachement"
        :key="file.experinces_attachement_id"
      >
        <v-list-item-icon>
          <v-icon>{{ getIcon(file.mime_type) }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            v-text="file.original_attachement_name"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="file.upload_date"
          ></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="openAttchement(file.attachement_path)">
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn
            icon
            @click="delete_attachement(file.experinces_attachement_id)"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
    <v-card flat v-else>
      <v-card-text>
        <h3 class="text-center">
          {{ attachNo }}
        </h3>
      </v-card-text>
    </v-card>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "exp-attachement-list",
  props: {
    experience_id: {
      type: Number,
      required: true
    },
    isReadOnly: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    attach() {
      return this.$vuetify.lang.t("$vuetify.Educational.attach");
    },
    attachNo() {
      return this.$vuetify.lang.t("$vuetify.Educational.attachNo");
    },
    deleteTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.deleteTitle");
    },
    uploadDeleteBody() {
      return this.$vuetify.lang.t("$vuetify.Educational.uploadDeleteBody");
    },
    deleteSuccessTitle() {
      return this.$vuetify.lang.t("$vuetify.Educational.deleteSuccessTitle");
    },
    uploadDeleteSuccessBody() {
      return this.$vuetify.lang.t(
        "$vuetify.Educational.uploadDeleteSuccessBody"
      );
    },
    ...mapGetters(["getEexperience_attachement"])
  },
  methods: {
    getIcon(mime_type) {
      if (mime_type.startsWith("image")) {
        return "mdi-file-image-outline";
      } else if (mime_type == "application/pdf") {
        return "mdi-file-pdf-outline";
      } else {
        return "mdi-file";
      }
    },
    delete_attachement(experinces_attachement_id) {
      let self = this;
      let data = {
        experinces_attachement_id,
        experience_id: this.experience_id
      };
      this.$root.$emit("show-alert", {
        status: "confirm",
        title: this.deleteTitle,
        body: this.uploadDeleteBody,
        data: data,
        action: "deleteOneExperienceAttachements",
        onSuccess(res) {
          if (res == "deleted") {
            self.$root.$emit("show-alert", {
              status: "success",
              title: this.deleteSuccessTitle,
              body: this.uploadDeleteSuccessBody
            });
          }
        }
      });
    },
    openAttchement(path) {
      let anchorElement = document.createElement("a");
      anchorElement.href = "/public/" + path;
      anchorElement.target = "_blank";
      anchorElement.click();
    }
  },
  mounted() {
    this.$store.dispatch("getOneExperienceAttachements", this.experience_id);
  }
};
</script>
