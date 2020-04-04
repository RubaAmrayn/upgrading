<template>
  <div>
    <educational-form></educational-form>
  </div>
</template>

<script>
export default {
  name: "educational-qualification",
  components: {
    "educational-form": () => import("@/components/profile/educationalForm")
  },
  data() {
    return {
      qualifications: []
    };
  }
};
</script>
