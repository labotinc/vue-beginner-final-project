<template>
  <div class="app-ui">
    <h1 class="current-turn">Current Turn: {{ currentTurn }}</h1>
    <h2 class="not-your-turn" v-show="!canDoAction">Wait for your turn!</h2>
    <h2 class="not-your-turn" v-show="showChooseDifferenct">
      Choose a different Action!
    </h2>
    <h2 class="end-game" v-if="hp <= 0">You died</h2>
    <h2 class="end-game" v-if="monsterHp <= 0">You survived</h2>
    <button
      class="reset-game-btn"
      v-if="hp <= 0 || monsterHp <= 0"
      @click="$emit('reset-game')"
    >
      PLAY AGAIN
    </button>
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
  props: ["currentTurn", "hp", "monsterHp"],
  data() {
    return {
      inAction: false,
      canDoAction: true,
      showChooseDifferenct: false
    };
  },
  methods: {
    lightAttack() {
      this.showChooseDifferenct = false;
      if (this.currentTurn === "warrior" && this.hp > 0 && !this.inAction) {
        this.$emit("warrior-light-attack", true);
        this.inAction = true;

        setTimeout(() => {
          this.inAction = false;
        }, 1000);
      }

      if (!this.currentTurn === "warrior" && this.hp > 0) {
        this.showNotYourTurn();
      }
    },
    heal() {
      if (
        this.currentTurn === "warrior" &&
        this.hp < 100 &&
        this.hp > 0 &&
        !this.inAction
      ) {
        this.$emit("warrior-healing");
        this.inAction = true;
      } else if (this.hp === 100) {
        this.showChooseDifferenct = true;
        setTimeout(() => {
          this.showChooseDifferenct = false;
        }, 1000);
      } else if (hp != 0 && monsterHp != 0 && !this.currentTurn === "warrior") {
        this.showNotYourTurn();
      }
    },
    showNotYourTurn() {
      this.canDoAction = false;
      setTimeout(() => {
        this.canDoAction = true;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
$light-red: #da5d53;

.end-game {
  position: fixed;
  top: 20%;
  left: 50%;
  min-width: 300px;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-transform: uppercase;
}

.reset-game-btn {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  text-transform: uppercase;
}

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
}

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
</style>
