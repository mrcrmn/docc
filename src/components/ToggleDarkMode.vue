<template>
  <button @click="toggleDarkMode">
    <slot />
  </button>
</template>

<script>
export default {
  methods: {
    toggleDarkMode() {
      const htmlEl = document.documentElement;
      const hasDarkMode = htmlEl.hasAttribute('lights-out');

      htmlEl.toggleAttribute('lights-out', ! hasDarkMode);

      return ! hasDarkMode;
    }
  }
};
</script>

<style>
</style>