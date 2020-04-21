<template>
  <div>
    <app-bar class="pramiry"></app-bar>
    <navigation-drawer></navigation-drawer>
  </div>
</template>

<script>
import appBar from "./appBar";
import navigationDrawer from "./navigationDrawer";
export default {
  name: "navigation",
  components: {
    "app-bar": appBar,
    "navigation-drawer": navigationDrawer
  }
};
</script>

<style></style>
