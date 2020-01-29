<template>
  <div class="app-warrior"></div>
</template>

<script>
export default {
  name: "warrior"
};
</script>

<style lang="scss" scoped>
.app-warrior {
  position: absolute;
  background: url("../assets/warrior/warrior.png") no-repeat;
  z-index: 30;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  transform: translate(-50%, -50%);

  left: 50vw;
  top: 73vh;

  background-position: -80px -80px;
  width: 100px;
  height: 130px;
  background-size: 1500px;

  @media (min-width: 768px) {
    background-position: -130px -125px;
    width: 100px;
    height: 150px;
    background-size: 2000px;
  }

  @media (min-width: 1920px) {
    top: 80vh;
  } 
}
</style>
