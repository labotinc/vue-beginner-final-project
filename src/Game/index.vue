<template>
  <div class="app-game">
    <app-world></app-world>
  </div>
</template>

<script>
import World from "./World";
export default {
  name: "game",
  components: {
    "app-world": World
  }
};
</script>

<style lang="scss" scoped>
$light-blue: #86c2ff;

.app-game {
  background-color: $light-blue;
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
