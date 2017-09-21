<template lang="pug">
  transition(name="slide-delay")
    .tip(v-if="isShow", :style="tipStyle")
      .status(:style="statusStyle")
      span.content {{ info }}
</template>

<script>
export default {
  name: 'tip',
  props: {
    status: {
      type: Boolean,
      required: true,
    },
    messages: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      colors: {
        normal: '#80d580',
        error: '#f68787',
      },
      isShow: !this.status,
    };
  },
  computed: {
    info() {
      return this.status ? this.messages.normal : this.messages.error;
    },
    statusStyle() {
      return {
        backgroundColor: this.status ? this.colors.normal : this.colors.error,
      };
    },
    tipStyle() {
      return {
        maxWidth: `${this.width}px`,
      };
    },
  },
  watch: {
    status(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.isShow = false;
        }, 1000);
      } else {
        this.isShow = true;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../sass/variables'

$time: 0.2s

.tip
  position: fixed
  display: flex
  align-items: center
  z-index: 1000
  bottom: 1em
  left: 0
  right: 0
  margin: 0 auto
  height: 3em
  border-radius: 4px
  background: #fff
  color: $text-color
  font-family: $title-font-family
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.15), 0 0.2em 1em rgba(0, 0, 0, 0.3)

.status
  display: inline-block
  width: 1em
  height: 1em
  border-radius: 50%
  margin: 0 1em

.slide-delay-enter-active, .slide-delay-leave-active
  transition: opacity $time, transform $time

.slide-delay-enter, .slide-delay-leave-to
  transform: translateY(-10%)
  opacity: 0
</style>
