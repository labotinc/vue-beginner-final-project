<template>
  <div class="app-ui">
    <!--
      TODO: 5. a. The Template
      TODO: 5. a. i. Render the currentTurn below
    -->
    <h1 class="current-turn">Current Turn: {{}}</h1>
    <!-- TODO: 5. a. ii. Use v-show passing !canDoAction as a value -->
    <h2 class="not-your-turn">Wait for your turn!</h2>
    <!-- TODO: 5. a. iii. Use v-show passing showChooseDifferentAction as a value -->
    <h2 class="not-your-turn">
      Choose a different Action!
    </h2>
    <!-- TODO: 5. a. iv. Use the v-if directive checking if hp <= 0 -->
    <h2 class="end-game">You died</h2>
    <!-- TODO: 5. a. v. Use the v-if directive checking if monsterHp <= 0 -->
    <h2 class="end-game">You survived</h2>
    <!--
      TODO: 5. a. vi. Use the v-if directive checking if hp <= 0 or monsterHp <= 0
      TODO: 5. a. vii. Listen to the click event and emit "reset-game" on click
    -->
    <button class="reset-game-btn">
      PLAY AGAIN
    </button>
    <div class="ui-action-btns">
      <!-- TODO: 5. a. vii. Listen to the click event and run the lightAttack method -->
      <button class="ui-attack-btn">
        ATTACK
      </button>
      <!-- TODO: 5. a. viii. Listen to the click event and run the heal method -->
      <button class="ui-heal-btn">HEAL</button>
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
      showChooseDifferentAction: false
    };
  },
  methods: {
    lightAttack() {
      this.showChooseDifferentAction = false;
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

        setTimeout(() => {
          this.inAction = false;
        }, 1000);
      } else if (this.hp === 100) {
        this.showChooseDifferentAction = true;
        setTimeout(() => {
          this.showChooseDifferentAction = false;
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
