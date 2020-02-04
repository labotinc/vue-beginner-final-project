<template>
  <div id="app">
    <!-- TODO: 1. c. Use the imported Game component -->
    <app-game></app-game>
  </div>
</template>

<script>
// TODO: 1. a. Import the Game component
import Game from "./Game";
export default {
  name: "app",
  components: {
    // TODO: 1. b. Declare the Game component
    'app-game': Game
  }
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
