<template lang="pug">
  li.item
    span.score {{ item.score }}
    p.title
      a.link(:href="normalizeURL(item)" target="_blank") {{ item.title }}
      span.host(v-if="item.url")  ({{ item.url | host }})
    span.meta
      span.time {{ item.time | timeAgo }} ago
      span.comments  | {{ item.descendants }} comments
</template>

<script>
export default {
  name: 'item',
  props: ['item'],
  methods: {
    normalizeURL(item) {
      return item.url ? item.url : `https://news.ycombinator.com/item?id=${item.id}`;
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../sass/variables'

$score-width: 80px

.item
  position: relative
  padding: 1em 1.5em 1em $score-width
  border-bottom: 1px solid #eee
  background: #fff

.title
  font-family: $title-font-family
  margin: 0.2em 0

  .link
    color: $title-color
    text-decoration: none
    &:hover
      color: $primary-color

.score
  position: absolute
  top: 50%
  left: 0
  margin-top: -$large-font-size/2
  width: $score-width
  text-align: center
  color: $primary-color
  font-family: $title-font-family
  font-size: $large-font-size

.meta, .host
  color: $text-color
  font-size: $small-font-size

</style>
