<template>
  <div class="app-game">
    <app-world></app-world>
    <app-warrior></app-warrior>
  </div>
</template>

<script>
import World from "./World";
import Warrior from "./Warrior";
export default {
  name: "game",
  components: {
    "app-world": World,
    "app-warrior": Warrior
  }
};
</script>

<style lang="scss" scoped>
$light-red: #da5d53;

.app-game {
  background-color: $light-red;
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
