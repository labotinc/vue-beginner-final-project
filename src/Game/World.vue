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
  height: 100vh;
  position: relative;

  .world-background-bg {
    height: 100vh;
    width: 100%;
    position: absolute;
    background: url("../assets/world/woods-bg.png") no-repeat center center fixed;
    background-size: cover;
    z-index: 10;
  }

  .world-background-far-trees {
    height: 100vh;
    width: 100%;
    position: absolute;
    background: url("../assets/world/woods-far-trees.png") no-repeat center center fixed;
    background-size: cover;
    z-index: 20;
  }

  .world-background-mid-trees {
    height: 100vh;
    width: 100%;
    position: absolute;
    background: url("../assets/world/woods-mid-trees.png") no-repeat center center fixed;
    background-size: cover;
    z-index: 30;
  }

  .world-background-close-trees {
    height: 100vh;
    width: 100%;
    position: absolute;
    background: url("../assets/world/woods-close-trees.png") no-repeat center center fixed;
    background-size: cover;
    z-index: 40;
  }
}
</style>
