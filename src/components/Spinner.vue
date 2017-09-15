<template lang="pug">
.spinner
  .bounce(v-for="i in dots", :style="[dotStyle, delay(i)]")
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#fff',
    },
    size: {
      type: Number,
      default: 18,
    },
  },
  data() {
    return {
      dots: 3,
      dotStyle: {
        width: `${this.size}px`,
        height: `${this.size}px`,
        margin: `${this.size / 6}px`,
        backgroundColor: this.color,
      },
    };
  },
  methods: {
    delay(i) {
      return {
        animationDelay: `${-0.16 * (this.dots - i)}s`,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.spinner
  margin: 1em auto
  text-align: center

.bounce
  border-radius: 100%
  display: inline-block
  animation: bouncedelay 1.4s infinite ease-in-out both

@keyframes bouncedelay
  0%, 80%, 100%
    transform: scale(0)
  40%
    transform: scale(1)
</style>
