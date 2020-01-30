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
        transition: ""
      }
    };
  },
  mounted() {},
  computed: {
    warriorClasses() {
      return {
        "is-idle": this.warrior.states.isIdle,
        "is-walking": this.warrior.states.isWalkingRight,
        "is-running": this.warrior.states.isRunningRight,
        "is-attacking":
          this.warrior.states.isAttacking && this.warrior.direction === "right",
        "is-attacking2":
          this.warrior.states.isAttacking2 && this.warrior.direction === "right"
      };
    }
  },
  methods: {}
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

  &.is-idle {
    background: url("../assets/warrior/warrior_idle_right.png") no-repeat;
    animation: is-idle 0.8s steps(3) infinite;
  }

  &.is-walking {
    animation: is-walking 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_walk_right.png") no-repeat;
  }

  &.is-running {
    animation: is-walking 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_run_right.png") no-repeat;
  }

  &.is-attacking {
    width: 100px;
    height: 65px;
    animation: is-attacking 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_attack1_right.png") no-repeat;
  }

  &.is-attacking2 {
    width: 100px;
    height: 65px;
    animation: is-attacking 0.8s steps(6) infinite;
    background: url("../assets/warrior/warrior_attack2_right.png") no-repeat;
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
</style>
