<template>
  <div
    id="warrior"
    class="app-warrior"
    :style="{
      left: `${warrior.position.x}%`,
      transition: warrior.transition
    }"
    :class="warriorClasses"
  >
    <div class="life-bar">
      HP: {{ actions.warrior.hp }}
      <div
        class="green-bar"
        :style="{ width: `${actions.warrior.hp}px` }"
      ></div>
    </div>
    <div class="current-turn" v-if="currentTurn === 'warrior'"></div>
  </div>
</template>

<script>
const TICK = 1000 / 15;

export default {
  name: "warrior",
  props: ["windowWidth", "actions", "AABB", "currentTurn", "wasHit", "isDead"],
  data() {
    return {
      collided: false,
      warrior: {
        stats: {
          attackDamage: 10
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
      this.$emit("warrior-position-x", this.warrior.position.initialX);
    }, 500);

    setInterval(this.gameLoop, TICK);
  },
  computed: {
    warriorClasses() {
      return {
        "is-idle": this.warrior.states.isIdle,
        "is-walking": this.warrior.states.isWalking,
        "is-running": this.warrior.states.isRunning,
        "is-attacking": this.warrior.states.isAttacking,
        "is-attacking2": this.warrior.states.isAttacking2,
        "is-jumping": this.warrior.states.isJumping,
        "is-hit": this.warrior.states.isHit,
        "is-dead": this.warrior.states.isDead,
        dead: this.warrior.states.dead
      };
    }
  },
  methods: {
    timeout(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    calculatePosition(width) {
      if (width >= 320 && width < 360) {
        this.setPosition(30);
      }

      if (width >= 360 && width < 410) {
        this.setPosition(23);
      }

      if (width >= 410 && width < 480) {
        this.setPosition(18);
      }

      if (width >= 480 && width < 768) {
        this.setPosition(12);
      }

      if (width >= 768 && width < 1360) {
        this.setPosition(10);
      }

      if (width >= 1360 && width < 1440) {
        this.setPosition(35);
      }

      if (width >= 1440) {
        this.setPosition(32);
      }
    },
    setPosition(position) {
      this.warrior.position.x = position;
      this.warrior.position.initialX = position;
    },
    gameLoop() {
      if (this.wasHit) {
        this.getHit();
      }
      if (this.isDead && !this.warrior.states.dead) {
        this.die();
      }
      if (this.actions.warrior.isLightAttacking) {
        this.$emit("warrior-light-attack", false);
        this.doLightAttack();
      }
    },
    reset() {
      Object.keys(this.warrior.states).forEach(state => {
        this.warrior.states[state] = false;
      });
    },
    async die() {
      this.warrior.states.isIdle = false;
      await this.timeout(TICK);
      this.warrior.states.isDead = true;
      await this.timeout(800);
      this.warrior.states.isDead = false;
      this.warrior.states.dead = true;
    },
    async getHit() {
      this.warrior.states.isIdle = false;
      await this.timeout(TICK);
      this.warrior.states.isHit = true;
      this.$emit("warrior-hit");
      await this.timeout(800);
      this.reset();
      this.warrior.states.isIdle = true;
    },
    async doLightAttack() {
      const walkDistance = this.actions.monster.position.x - 6;

      if (walkDistance > 0) {
        this.warrior.states.isIdle = false;
        await this.timeout(TICK);
        this.warrior.states.isWalking = true;
        await this.timeout(TICK);
        this.warrior.transition = ".1s linear";
        const finishedWalk = await this.moveWarrior(0.5, walkDistance / 2 + 5);

        if (finishedWalk) {
          await this.timeout(TICK);
          this.warrior.transition = "none";
          this.warrior.states.isWalking = false;
          this.warrior.states.isRunning = true;
          this.warrior.transition = ".1s linear";
          const finishedRun = await this.moveWithAABB(1.5);

          if (finishedRun) {
            await this.timeout(TICK);
            this.warrior.states.isRunning = false;
            this.warrior.transition = "none";
            const finishedAttack = await this.lightAttack();

            if (finishedAttack) {
              this.$emit("monster-was-hit", this.warrior.stats.attackDamage);
              await this.timeout(TICK);
              this.warrior.states.isAttacking = false;
              await this.timeout(TICK);
              this.warrior.transition = "0.1s linear";
              await this.timeout(TICK);
              this.warrior.states.isJumping = true;
              const finishedJumpingBack = await this.moveWarriorBack(2);

              if (finishedJumpingBack) {
                await this.timeout(TICK);
                this.warrior.transition = "none";
                this.reset();
                this.warrior.states.isIdle = true;
                this.$emit("finished-turn", "monster");
                await this.timeout(TICK);
                this.$emit("monster-can-attack", true);
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

          this.warrior.position.x += speed;
          if (
            collided &&
            this.warrior.position.x >= this.actions.monster.position.x - 4
          ) {
            clearInterval(moveLoop);
            resolve(true);
          }
        }, TICK);
      });
    },
    moveWarrior(speed, distance) {
      return new Promise((resolve, reject) => {
        let moveLoop = setInterval(() => {
          this.warrior.position.x += speed;

          if (this.warrior.position.x > distance) {
            clearInterval(moveLoop);
            resolve(true);
          }
        }, TICK);
      });
    },
    moveWarriorBack(speed) {
      return new Promise((resolve, reject) => {
        let moveLoop = setInterval(() => {
          this.warrior.position.x -= speed;

          if (this.warrior.position.initialX > this.warrior.position.x) {
            this.warrior.position.x = this.warrior.position.initialX;
            clearInterval(moveLoop);
            resolve(true);
          }
        }, TICK);
      });
    },
    lightAttack() {
      return new Promise(async (resolve, reject) => {
        this.warrior.states.isAttacking = true;
        await this.timeout(850);
        resolve(true);
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

.app-warrior {
  position: fixed;
  background: url("../assets/warrior/warrior_idle.png") no-repeat;
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
    background: url("../assets/warrior/warrior_idle.png") no-repeat;
    animation: is-idle 0.8s steps(3) infinite;
  }

  &.is-walking {
    animation: is-walking 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_walk.png") no-repeat;
  }

  &.is-running {
    animation: is-walking 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_run.png") no-repeat;
  }

  &.is-attacking {
    width: 100px;
    height: 65px;
    animation: is-attacking 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_attack1.png") no-repeat;
  }

  &.is-attacking2 {
    width: 100px;
    height: 65px;
    animation: is-attacking 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_attack2.png") no-repeat;
  }

  &.is-jumping {
    animation: is-jumping 0.8s steps(5) infinite;
    background: url("../assets/warrior/warrior_jump.png") no-repeat;
  }

  &.is-hit {
    animation: is-idle 0.8s steps(3) infinite;
    background: url("../assets/warrior/warrior_hit.png") no-repeat;
  }

  &.is-dead {
    animation: is-jumping 0.8s steps(5) infinite;
    background: url("../assets/warrior/warrior_fall.png") no-repeat;
  }

  &.dead {
    background: url("../assets/warrior/warrior_fall.png") no-repeat -200px 0;
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
</style>
