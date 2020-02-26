<template>
  <button @click="toggleDarkMode">
    <slot :dark="isDarkMode" />
  </button>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false
    }
  },

  methods: {
    toggleDarkMode() {
      const htmlEl = document.documentElement;
      const hasDarkMode = htmlEl.hasAttribute('lights-out');

      htmlEl.toggleAttribute('lights-out', ! hasDarkMode);

      this.isDarkMode = ! hasDarkMode;

      return ! hasDarkMode;
    }
  }
};
</script>

<style>
</style>