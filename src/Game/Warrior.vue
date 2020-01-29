<template>
  <div
    id="warrior"
    class="app-warrior"
    :style="{
      left: `${warrior.position.x}px`,
      transition: warrior.transition
    }"
    :class="warriorClasses"
  ></div>
</template>

<script>
let keys = {};

export default {
  name: "warrior",
  data() {
    return {
      warrior: {
        stats: {
          attackDamage: 30
        },
        states: {
          isIdle: true,
          isWalkingRight: false,
          isWalkingLeft: false,
          isRunningRight: false,
          isRunningLeft: false,
          isAttacking: false,
          isAttacking2: false
        },
        position: {
          x: 100
        },
        transition: "",
        direction: "right"
      }
    };
  },
  mounted() {
    window.addEventListener("keydown", e => this.captureEvents(e));
    window.addEventListener("keyup", e => this.releaseEvents(e));
  },
  computed: {
    warriorClasses() {
      return {
        "is-idle-right":
          this.warrior.states.isIdle && this.warrior.direction === "right",
        "is-idle-left":
          this.warrior.states.isIdle && this.warrior.direction === "left",
        "is-walking-right": this.warrior.states.isWalkingRight,
        "is-walking-left": this.warrior.states.isWalkingLeft,
        "is-running-right": this.warrior.states.isRunningRight,
        "is-running-left": this.warrior.states.isRunningLeft,
        "is-attacking-right":
          this.warrior.states.isAttacking && this.warrior.direction === "right",
        "is-attacking-left":
          this.warrior.states.isAttacking && this.warrior.direction === "left",
        "is-attacking2-right":
          this.warrior.states.isAttacking2 && this.warrior.direction === "right"
      };
    }
  },
  methods: {
    captureEvents(e) {
      keys[e.code] = true;

      setTimeout(() => {
        this.warrior.transition = "0.1s ease";
      }, 0);

      Object.keys(this.warrior.states).forEach(state => {
        if (state !== "isIdle") {
          this.warrior.states[state] = false;
        }
      });

      if (e.code === "ArrowRight") {
        if (keys["ShiftLeft"]) {
          this.warrior.states.isRunningRight = true;
          this.warrior.direction = "right";
          this.warrior.position.x += 30;
        } else {
          this.warrior.states.isWalkingRight = true;
          this.warrior.direction = "right";
          this.warrior.position.x += 15;
        }
      }

      if (e.code === "ArrowLeft") {
        if (keys["ShiftLeft"]) {
          this.warrior.states.isRunningLeft = true;
          this.warrior.direction = "left";
          this.warrior.position.x -= 30;
        } else {
          this.warrior.states.isWalkingLeft = true;
          this.warrior.direction = "left";
          this.warrior.position.x -= 15;
        }
      }

      if (e.code === "Space") {
        this.warrior.states.isAttacking = true;

        if (keys["ShiftLeft"]) {
          this.warrior.states.isAttacking2 = true;
        }
      }
    },
    releaseEvents(e) {
      delete keys[e.code];

      this.warrior.transition = "";

      Object.keys(this.warrior.states).forEach(state => {
        if (state === "isIdle") {
          this.warrior.states[state] = true;
          this.warrior.transition = "";
        } else {
          this.warrior.states[state] = false;
        }
      });
    }
  }
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
  left: 50vw;
  top: 82%;

  background-size: cover;
  width: 50px;
  height: 48px;
  background-position: 0 0;

  @media (min-width: 1360px) and (min-height: 768px) {
    top: 73%;
    transform: translate(-50%, -50%) scale(3);
  }

  @media (min-width: 1440px) {
    top: 72%;
    transform: translate(-50%, -50%) scale(3.2);
  }

  @media (min-width: 1920px) and (min-height: 1080px) {
    transform: translate(-50%, -50%) scale(4);
  }

  @media (min-width: 2100px) {
    top: 78%;
    transform: translate(-50%, -50%) scale(4);
  }

  &.is-idle-right {
    background: url("../assets/warrior/warrior_idle_right.png") no-repeat;
    animation: is-idle-right 0.8s steps(3) infinite;
  }

  &.is-idle-left {
    background: url("../assets/warrior/warrior_idle_left.png") no-repeat;
    animation: is-idle-left 0.8s steps(3) infinite;
  }

  &.is-walking-right {
    animation: is-walking-right 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_walk_right.png") no-repeat;
  }

  &.is-walking-left {
    animation: is-walking-left 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_walk_left.png") no-repeat;
  }

  &.is-running-right {
    animation: is-walking-right 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_run_right.png") no-repeat;
  }

  &.is-running-left {
    animation: is-walking-left 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_run_left.png") no-repeat;
  }

  &.is-attacking-right {
    width: 100px;
    height: 65px;
    animation: is-attacking-right 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_attack1_right.png") no-repeat;
  }

  &.is-attacking-left {
    width: 100px;
    height: 65px;
    animation: is-attacking-left 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_attack1_left.png") no-repeat;
  }

  &.is-attacking2-right {
    width: 100px;
    height: 65px;
    animation: is-attacking-right 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_attack2_right.png") no-repeat;
  }

  &.is-attacking2-left {
    width: 100px;
    height: 65px;
    animation: is-attacking-left 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_attack2_left.png") no-repeat;
  }
}

@keyframes is-idle-right {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -150px 0;
  }
}

@keyframes is-idle-left {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -150px 0;
  }
}

@keyframes is-walking-right {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -300px 0;
  }
}

@keyframes is-walking-left {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -300px 0;
  }
}

@keyframes is-attacking-right {
  from {
    background-position: 0 -10px;
  }

  to {
    background-position: -600px -10px;
  }
}

@keyframes is-attacking-left {
  from {
    background-position: 0 -10px;
  }

  to {
    background-position: -600px -10px;
  }
}
</style>
