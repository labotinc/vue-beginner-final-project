<template>
  <div class="app-ui">
    <div class="ui-action-btns">
      <button class="ui-attack-btn">ATTACK</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-ui {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
}

.ui-action-btns {
  position: fixed;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 15px;
}

.ui-attack-btn {
  width: 100px;
  height: 40px;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
}
</style>
