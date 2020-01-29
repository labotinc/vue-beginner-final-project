<template>
  <div class="app-world">
    <div class="world-background-bg"></div>
    <div class="world-background-far-trees"></div>
    <div class="world-background-mid-trees"></div>
    <div class="world-background-close-trees"></div>
  </div>
</template>

<script>
export default {
  name: "world"
};
</script>

<style lang="scss" scoped>
  .app-world {
    width: 100%;
    height: 100%;
    position: relative;

    .world-background-bg {
      height: 100%;
      width: 100%;
      position: absolute;
      background: url("../assets/world/woods-bg.png");
      z-index: 10;
    }

    .world-background-far-trees {
      height: 100%;
      width: 100%;
      position: absolute;
      background: url("../assets/world/woods-far-trees.png");
      z-index: 20;
    }

    .world-background-mid-trees {
      height: 100%;
      width: 100%;
      position: absolute;
      background: url("../assets/world/woods-mid-trees.png") no-repeat center center;
      background-size: 100%;
      z-index: 30;
    }

    .world-background-close-trees {
      height: 100%;
      width: 100%;
      position: absolute;
      background: url("../assets/world/woods-close-trees.png") no-repeat center center;
      background-size: 100%;
      z-index: 40;
    }
  }
</style>
