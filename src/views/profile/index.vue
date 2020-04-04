<template>
  <div>
    <educational-qualification></educational-qualification>
  </div>
</template>

<script>
export default {
  name: "profile-view",
  components: {
    "educational-qualification": () => import("./educationalQualification")
  }
};
</script>
