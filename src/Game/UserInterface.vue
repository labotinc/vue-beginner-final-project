<template>
  <div class="app-ui">
    <h1 class="current-turn">Current Turn: {{ currentTurn }}</h1>
    <h2 class="not-your-turn" v-show="!canDoAction">Wait for your turn!</h2>
    <h2 class="not-your-turn" v-show="showChooseDifferenct">
      Choose a different Action!
    </h2>
    <div class="ui-action-btns">
      <button class="ui-attack-btn" @click="lightAttack">
        ATTACK
      </button>
      <button class="ui-heal-btn" @click="heal">HEAL</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "interface",
  props: ["currentTurn", "hp"],
  data() {
    return {
      canDoAction: true,
      showChooseDifferenct: false
    };
  },
  methods: {
    lightAttack() {
      this.showChooseDifferenct = false;
      if (this.currentTurn === "warrior" && this.hp > 0) {
        this.$emit("warrior-light-attack", true);
      } else {
        this.showNotYourTurn();
      }
    },
    heal() {
      if (this.currentTurn === "warrior" && this.hp < 100 && this.hp > 0) {
        this.$emit("warrior-healing");
      } else if (this.hp === 100) {
        this.showChooseDifferenct = true;
      } else {
        this.showNotYourTurn();
      }
    },
    showNotYourTurn() {
      this.canDoAction = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$light-red: #da5d53;

.app-ui {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
}

.current-turn {
  position: fixed;
  top: 10%;
  left: 50%;
  min-width: 300px;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-transform: uppercase;
}

.not-your-turn {
  position: fixed;
  top: 20%;
  left: 50%;
  min-width: 300px;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-transform: uppercase;
  transition: 0.3s ease;
}

.ui-action-btns {
  position: fixed;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  button {
    width: 100px;
    height: 40px;
    border: 1px solid white;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    transition: 0.3s ease;

    &:hover {
      border-color: $light-red;
      color: $light-red;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
}

.ui-attack-btn {
}
</style>
