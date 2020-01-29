<template>
  <div id="app">
    <app-game></app-game>
  </div>
</template>

<script>
import Game from "./Game"
export default {
  name: "app",
  components: {
    "app-game": Game
  }
};
</script>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
