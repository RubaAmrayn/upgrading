<template>
  <v-list two-line flat>
    <v-subheader inset>المرفقات</v-subheader>
    <v-list-item-group color="primary" append-icon="mdi-folder">
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-icon>
          <v-icon :class="[item.iconClass || '']">mdi-{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "edu-attachement-list",
  data() {
    return {
      items: [
        {
          icon: "file-pdf-outline",
          // iconClass: "primary lighten-1 white--text",
          title: "Photos",
          subtitle: "Jan 9, 2014"
        },
        {
          icon: "file-pdf-outline",
          // iconClass: "primary lighten-1 white--text",
          title: "Recipes",
          subtitle: "Jan 17, 2014"
        },
        {
          icon: "file-image-outline",
          // iconClass: "primary lighten-1 white--text",
          title: "Work",
          subtitle: "Jan 28, 2014"
        }
      ]
    };
  }
};
</script>
