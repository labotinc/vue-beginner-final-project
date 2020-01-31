<template>
  <div
    id="monster"
    class="app-monster"
    :style="{
      left: `${monster.position.x}%`,
      transition: monster.transition
    }"
    :class="monsterClasses"
  >
    <div class="life-bar">
      HP: {{ actions.monster.hp }}
      <div
        class="green-bar"
        :style="{ width: `${actions.monster.hp}px` }"
      ></div>
    </div>
    <div class="current-turn" v-if="currentTurn === 'monster'"></div>
  </div>
</template>

<script>
const TICK = 1000 / 15;

export default {
  name: "monster",
  props: [
    "windowWidth",
    "actions",
    "currentTurn",
    "monsterCanAttack",
    "AABB",
    "wasHit",
    "isDead"
  ],
  data() {
    return {
      collided: false,
      monster: {
        stats: {
          hp: this.actions.monster.hp,
          attackDamage: 30
        },
        states: {
          isIdle: true,
          isWalking: false,
          isRunning: false,
          isAttacking: false,
          isAttacking2: false,
          isJumping: false,
          isHit: false,
          isDead: false,
          dead: false
        },
        position: {
          initialX: 0,
          x: 0
        },
        transition: "none"
      }
    };
  },
  watch: {
    windowWidth: {
      immediate: true,
      handler(newWidth, oldWidth) {
        if (newWidth !== oldWidth) {
          this.calculatePosition(newWidth);
        }
      }
    }
  },
  mounted() {
    this.calculatePosition(this.windowWidth);

    setTimeout(() => {
      this.$emit("monster-position-x", this.monster.position.initialX);
    }, 500);

    setInterval(this.gameLoop, TICK);
  },
  computed: {
    monsterClasses() {
      return {
        "is-idle": this.monster.states.isIdle,
        "is-walking": this.monster.states.isWalking,
        "is-running": this.monster.states.isRunning,
        "is-attacking": this.monster.states.isAttacking,
        "is-attacking2": this.monster.states.isAttacking2,
        "is-jumping": this.monster.states.isJumping,
        "is-hit": this.monster.states.isHit,
        "is-dead": this.monster.states.isDead,
        dead: this.monster.states.dead
      };
    }
  },
  methods: {
    timeout(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    calculatePosition(width) {
      if (width >= 320 && width < 360) {
        this.setPosition(65);
      }

      if (width >= 360 && width < 410) {
        this.setPosition(62);
      }

      if (width >= 410 && width < 480) {
        this.setPosition(60);
      }

      if (width >= 480 && width < 768) {
        this.setPosition(12);
      }

      if (width >= 768 && width < 1360) {
        this.setPosition(70);
      }

      if (width >= 1360 && width < 1440) {
        this.setPosition(65);
      }

      if (width >= 1440 && width < 1920) {
        this.setPosition(71);
      }

      if (width >= 1920) {
        this.setPosition(69);
      }
    },
    setPosition(position) {
      this.monster.position.x = position;
      this.monster.position.initialX = position;
    },
    gameLoop() {
      if (this.wasHit) {
        this.getHit();
      }
      if (this.isDead && !this.monster.states.dead) {
        this.die();
      }
      if (!this.wasHit && !this.isDead && this.monsterCanAttack) {
        if (this.actions.warrior.position.x > 0) {
          this.$emit("monster-light-attack");
          this.doLightAttack();
        }
      }
    },
    reset() {
      Object.keys(this.monster.states).forEach(state => {
        this.monster.states[state] = false;
      });
    },
    async die() {
      this.monster.states.isIdle = false;
      await this.timeout(TICK);
      this.monster.states.isDead = true;
      await this.timeout(800);
      this.monster.states.isDead = false;
      this.monster.states.dead = true;
    },
    async getHit() {
      this.monster.states.isIdle = false;
      await this.timeout(TICK);
      this.monster.states.isHit = true;
      this.$emit("monster-hit");
      await this.timeout(800);
      this.reset();
      this.monster.states.isIdle = true;
    },
    async doLightAttack() {
      const walkDistance = this.actions.warrior.position.x;

      if (walkDistance > 0) {
        this.monster.states.isIdle = false;
        await this.timeout(TICK);
        this.monster.states.isWalking = true;
        await this.timeout(TICK);
        this.monster.transition = ".1s linear";
        const finishedWalk = await this.moveMonster(0.5, walkDistance * 2 - 2);

        if (finishedWalk) {
          await this.timeout(TICK);
          this.monster.transition = "none";
          this.monster.states.isWalking = false;
          this.monster.states.isRunning = true;
          this.monster.transition = ".1s linear";
          const finishedRun = await this.moveWithAABB(3);

          if (finishedRun) {
            await this.timeout(TICK);
            this.monster.states.isRunning = false;
            this.monster.transition = "none";
            const finishedAttack = await this.lightAttack();

            if (finishedAttack) {
              this.$emit("warrior-was-hit", this.monster.stats.attackDamage);
              await this.timeout(TICK);
              this.monster.states.isAttacking = false;
              await this.timeout(TICK);
              this.monster.transition = "0.1s linear";
              await this.timeout(TICK);
              this.monster.states.isJumping = true;
              const finishedJumpingBack = await this.moveMonsterBack(2);

              if (finishedJumpingBack) {
                await this.timeout(TICK);
                this.monster.transition = "none";
                this.reset();
                this.monster.states.isIdle = true;
                this.$emit("finished-turn", "warrior");
                await this.timeout(TICK);
              }
            }
          }
        }
      }
    },
    moveWithAABB(speed) {
      return new Promise((resolve, reject) => {
        let moveLoop = setInterval(() => {
          let collided = this.AABB();

          this.monster.position.x -= speed;
          if (
            collided &&
            this.monster.position.x <= this.actions.warrior.position.x + 10
          ) {
            clearInterval(moveLoop);
            resolve(true);
          }
        }, TICK);
      });
    },
    moveMonster(speed, distance) {
      return new Promise((resolve, reject) => {
        let moveLoop = setInterval(() => {
          this.monster.position.x -= speed;

          if (this.monster.position.x < distance) {
            clearInterval(moveLoop);
            resolve(true);
          }
        }, TICK);
      });
    },
    lightAttack() {
      return new Promise(async (resolve, reject) => {
        this.monster.states.isAttacking = true;
        await this.timeout(850);
        resolve(true);
      });
    },
    moveMonsterBack(speed) {
      return new Promise((resolve, reject) => {
        let moveLoop = setInterval(() => {
          this.monster.position.x += speed;

          if (this.monster.position.initialX > this.monster.position.x) {
            this.monster.position.x = this.monster.position.initialX;
            clearInterval(moveLoop);
            resolve(true);
          }
        }, TICK);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$life-bar-green: #abffab;
$life-bar-red: red;

.life-bar {
  width: 100px;
  background-color: $life-bar-red;
  height: 15px;
  font-size: 10px;
  transform: translate(-50%, -50%) scale(0.3);
  position: absolute;
  left: 50%;
  top: 5px;
  z-index: 60;
  display: flex;
  justify-content: center;
  align-items: center;

  .green-bar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: $life-bar-green;
    width: 100px;
    height: 15px;
  }
}

.current-turn {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid lime;
  position: absolute;
  left: 50%;
  top: -5px;
  transform: translate(-50%, -50%) scale(0.2);
  animation: current-turn 1s infinite;

  @keyframes current-turn {
    from {
      top: -5px;
    }

    50% {
      top: -2px;
    }

    to {
      top: -5px;
    }
  }
}

.app-monster {
  position: fixed;
  background: url("../assets/monster/monster_idle.png") no-repeat;
  background-size: cover;
  background-position: 0 0;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  transform: translate(-50%, -50%) scale(2.5);

  z-index: 40;
  top: 71%;
  width: 50px;
  height: 48px;

  @media (min-width: 768px) {
    transform: translate(-50%, -50%) scale(4);
  }

  @media (min-width: 1360px) and (min-height: 768px) {
    top: 73%;
  }

  @media (min-width: 1440px) {
    top: 70%;
    transform: translate(-50%, -50%) scale(4);
  }

  @media (min-width: 1920px) and (min-height: 1080px) {
  }

  @media (min-width: 2100px) {
    top: 76%;
    transform: translate(-50%, -50%) scale(5);
  }

  &.is-idle {
    background: url("../assets/monster/monster_idle.png") no-repeat;
    animation: is-idle 0.8s steps(3) infinite;
  }

  &.is-walking {
    animation: is-walking 0.8s steps(6) infinite;
    background: url("../assets/monster/monster_walk.png") no-repeat;
  }

  &.is-running {
    animation: is-walking 0.8s steps(6) infinite;
    background: url("../assets/monster/monster_run.png") no-repeat;
  }

  &.is-attacking {
    width: 100px;
    height: 65px;
    animation: is-attacking 0.8s steps(6) infinite;
    background: url("../assets/monster/monster_attack1.png") no-repeat;
  }

  &.is-attacking2 {
    width: 100px;
    height: 65px;
    animation: is-attacking 0.8s steps(6) infinite;
    background: url("../assets/monster/monster_attack2.png") no-repeat;
  }

  &.is-jumping {
    animation: is-jumping 0.8s steps(5) infinite;
    background: url("../assets/monster/monster_jump.png") no-repeat;
  }

  &.is-hit {
    animation: is-idle 0.8s steps(3) infinite;
    background: url("../assets/monster/monster_hit.png") no-repeat;
  }

  &.is-dead {
    animation: is-dead 0.8s steps(4) infinite;
    background: url("../assets/monster/monster_fall.png") no-repeat;
  }

  &.dead {
    background: url("../assets/monster/monster_fall.png") no-repeat 0 0;
    animation: none;
  }
}

@keyframes is-idle {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -150px 0;
  }
}

@keyframes is-walking {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -300px 0;
  }
}

@keyframes is-attacking {
  from {
    background-position: 0 -10px;
  }

  to {
    background-position: -600px -10px;
  }
}

@keyframes is-jumping {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -250px 0;
  }
}

@keyframes is-dead {
  from {
    background-position: -200px 0;
  }

  to {
    background-position: 0px 0;
  }
}
</style>
