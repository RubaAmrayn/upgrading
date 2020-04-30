<template>
  <div>
    <v-menu
      offset-x
      :close-on-content-click="false"
      max-width="550"
      max-height="600"
      transition="scroll-y-transition"
    >
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <course-poster></course-poster>
        </div>
      </template>
      <poster-details></poster-details>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: "course",
  components: {
    "course-poster": () => import("@/components/courses/course/coursePoster"),
    "poster-details": () => import("@/components/courses/course/posterDetails")
  },
  provide() {
    return {
      course: this.course,
      poster: this.poster
    };
  },
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    }
  },
  props: {
    poster: {
      type: Object,
      required: false
    },
    course: {
      type: Object,
      required: false
    }
  }
};
</script>
<style>
.descriptionText {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.v-overlay__content {
  height: 100%;
  width: 100%;
}
</style>
