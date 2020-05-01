<template>
  <div>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card style="border-radius: 6px" class="mx-auto">
          <poster-title style="height:180px;"></poster-title>
          <poster-body></poster-body>
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-row justify="center" align="center" style="height: 100%">
                <v-col cols="6">
                  <v-btn block>التفاصيل</v-btn>
                </v-col>
              </v-row>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "course-poster",
  components: {
    "poster-title": () => import("./posterTitle"),
    "poster-body": () => import("./posterBody")
  }
  // props: ["course"]
};
</script>

<style></style>
