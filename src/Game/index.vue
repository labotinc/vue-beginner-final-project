<template>
  <div class="app-game">
    <app-world></app-world>
    <app-warrior></app-warrior>
    <app-ui></app-ui>
    <div id="monster"></div>
  </div>
</template>

<script>
import World from "./World";
import Warrior from "./Warrior";
import UserInterface from "./UserInterface";
export default {
  name: "game",
  components: {
    "app-world": World,
    "app-warrior": Warrior,
    "app-ui": UserInterface
  },
  mounted() {
    const m = document.getElementById("monster");
    console.log(this.getPosition(m));
  },
  methods: {
    getPosition(element) {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left + window.scrollY,
        top: rect.top + window.scrollX
      };
    },
    captureClick(e) {
      console.log(e);
    }
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

#monster {
  background-color: white;
  width: 85px;
  height: 100px;
  position: absolute;
  top: 72%;
  left: 62%;
  z-index: 30;
}
</style>
