<template>
  <div class="card">
    <p>{{ card.title }}</p>
    <img
      :style="{ width: `${card.background.width}px` }"
      :src="card.background.src"
      alt="">
  </div>
</template>

<script>
export default {
  props: {
    card: { required: true, type: Object }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  height: 100px;
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: $border-radius;
  position: relative;
  overflow: hidden;

  p {
    font-family: 'Bangers', cursive;
    font-size: 32px;
    letter-spacing: 1px;
    color: $dark-font;
    position: relative;
    z-index: 5;
  }

  img {
    position: absolute;
    z-index: 0;
    right: -60px;
    transform: rotate(-25deg);
    opacity: 0.75;
  }
}
</style>
