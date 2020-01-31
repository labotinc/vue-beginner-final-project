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

  & > * {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }

  .world-background-bg {
    height: 100vh;
    width: 100%;
    position: absolute;
    background: url("../assets/world/woods-bg.png") center center fixed;
    background-size: cover;
    z-index: 10;
  }

  .world-background-far-trees {
    height: 100vh;
    width: 100%;
    position: absolute;
    background: url("../assets/world/woods-far-trees.png") center center fixed;
    background-size: cover;
    z-index: 20;
    /* animation: far-trees 1000s infinite; */
  }

  .world-background-mid-trees {
    height: 100vh;
    width: 100%;
    position: absolute;
    background: url("../assets/world/woods-mid-trees.png") center center fixed;
    background-size: cover;
    z-index: 30;
  }

  .world-background-close-trees {
    height: 100vh;
    width: 100%;
    position: absolute;
    background: url("../assets/world/woods-close-trees.png") center center fixed;
    background-position-x: 155px;
    background-size: cover;
    z-index: 50;
    opacity: 0.9;
    /* animation: close-trees 2000s infinite; */


    @media (min-width: 1360px) {
      background-position-x: 510px;
    }
  }

  @keyframes close-trees {
    to {
      background-position-x: 6000px;
    }
  }

  @keyframes far-trees {
    to {
      background-position-x: -6000px;
    }
  }
}
</style>
