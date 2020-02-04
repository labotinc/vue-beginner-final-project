<template>
  <div class="app-game">
    <app-world></app-world>

    <app-warrior
      :windowWidth="windowWidth"
      :actions="state"
      :AABB="AABB"
      :currentTurn="currentTurn"
      :wasHit="state.warrior.wasHit"
      :isDead="state.warrior.hp <= 0"
      :resetGame="reset"
      @game-was-reset="reset = false"
      @warrior-light-attack="state.warrior.isLightAttacking = false"
      @warrior-position-x="state.warrior.position.x = $event"
      @monster-was-hit="damageMonster($event)"
      @finished-turn="currentTurn = $event"
      @monster-can-attack="monsterCanAttack = $event"
      @warrior-hit="state.warrior.wasHit = false"
    ></app-warrior>

    <app-monster
      :windowWidth="windowWidth"
      :actions="state"
      :AABB="AABB"
      :currentTurn="currentTurn"
      :monsterCanAttack="monsterCanAttack"
      :wasHit="state.monster.wasHit"
      :isDead="state.monster.hp <= 0"
      :resetGame="reset"
      @game-was-reset="reset = false"
      @monster-light-attack="monsterCanAttack = false"
      @warrior-was-hit="damageWarrior($event)"
      @finished-turn="currentTurn = $event"
      @monster-position-x="state.monster.position.x = $event"
      @monster-hit="state.monster.wasHit = false"
    ></app-monster>

    <app-ui
      :currentTurn="currentTurn"
      :hp="state.warrior.hp"
      :monsterHp="state.monster.hp"
      @warrior-healing="healWarrior"
      @warrior-light-attack="state.warrior.isLightAttacking = $event"
      @reset-game="resetGame()"
    ></app-ui>
  </div>
</template>

<script>
import World from "./World";
import Warrior from "./Warrior";
import Monster from "./Monster";
import UserInterface from "./UserInterface";
export default {
  name: "game",
  components: {
    "app-world": World,
    "app-warrior": Warrior,
    "app-monster": Monster,
    "app-ui": UserInterface
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      currentTurn: "warrior",
      monsterCanAttack: false,
      reset: false,
      state: {
        warrior: {
          hp: 100,
          isLightAttacking: false,
          wasHit: false,
          position: {
            x: 0
          }
        },
        monster: {
          hp: 100,
          isLightAttacking: false,
          wasHit: false,
          position: {
            x: 0
          }
        }
      }
    };
  },
  methods: {
    damageMonster(damage) {
      this.state.monster.wasHit = true;
      this.state.monster.hp -= damage;
      if (this.state.monster.hp < 0) {
        this.state.monster.hp = 0;
      }
    },
    damageWarrior(damage) {
      this.state.warrior.wasHit = true;
      this.state.warrior.hp -= damage;
      if (this.state.warrior.hp < 0) {
        this.state.warrior.hp = 0;
      }
    },
    healWarrior() {
      if (this.state.warrior.hp < 100) {
        this.state.warrior.hp += 40;
      }
      if (this.state.warrior.hp >= 100) {
        this.state.warrior.hp = 100;
      }
      this.currentTurn = "monster";
      this.monsterCanAttack = true;
    },
    resetGame() {
      this.reset = true;
      this.monsterCanAttack = false;
      this.state.warrior.hp = 100;
      this.state.monster.hp = 100;
      this.currentTurn = "warrior";
    },
    AABB() {
      const warrior = document.getElementById("warrior");
      const monster = document.getElementById("monster");
      const rect1 = warrior.getBoundingClientRect();
      const rect2 = monster.getBoundingClientRect();

      return (
        rect1.left < rect2.left + rect2.width &&
        rect1.left + rect1.width > rect2.left &&
        rect1.top < rect2.top + rect2.height &&
        rect1.top + rect1.height > rect2.top
      );
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
</style>
