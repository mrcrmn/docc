<template>
  <div
    @resize="checkWidth"
    class="overflow-container overflow-hidden rounded-lg"
    :class="{
      'is-overflowing': isOverflowing,
      'can-scroll-left': canScrollLeft,
      'can-scroll-right': canScrollRight
    }"
  >
    <div
      ref="container"
      @scroll="checkScrollPos"
      class="overflow-x-auto"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentWidth: 0,
      containerWidth: 0,
      scrollPosition: 0,
      resizeObserver: null
    };
  },

  computed: {
    isOverflowing() {
      return this.contentWidth > this.containerWidth;
    },
    canScrollLeft() {
      return this.isOverflowing
        && this.scrollPosition > 0;
    },
    canScrollRight() {
      return this.isOverflowing
        && (this.containerWidth + this.scrollPosition) < this.contentWidth;
    }
  },

  methods: {
    checkWidth() {
      console.log('resizing');
      const { container } = this.$refs;

      this.contentWidth = Math.ceil(container.scrollWidth);
      this.containerWidth = Math.ceil(container.getBoundingClientRect().width);
    },
    checkScrollPos() {
      this.scrollPosition = this.$refs.container.scrollLeft;
    }
  },

  mounted() {
    this.checkWidth();
    this.checkScrollPos();
    this.resizeObserver = new ResizeObserver(this.checkWidth);
    this.resizeObserver.observe(this.$refs.container);
  }
};
</script>

<style lang="scss" scoped>
.overflow-container {
  @apply relative;

  &::before, &::after {
    content: "";
    @apply absolute inset-y-0 w-6 opacity-0 pointer-events-none transition-all duration-200 ease-out;
    z-index: 2;
  }

  &::before {
    @apply left-0;
    background-image: linear-gradient(-90deg, rgba(255, 255, 255, .25) 0rem, rgba(0, 0, 0, .1) 4rem);
  }

  &::after {
    @apply right-0;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, .25) 0rem, rgba(0, 0, 0, .1) 4rem);
  }

  &.can-scroll-left {
    &::before {
      @apply opacity-100;
    }
  }

  &.can-scroll-right {
    &::after {
      @apply opacity-100;
    }
  }
}
</style>