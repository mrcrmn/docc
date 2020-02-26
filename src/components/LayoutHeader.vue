<template>
  <div class="h-full flex justify-between items-center">
    <div class="px-4 w-full sm:max-w-sm">
      <g-link to="/" class="font-black italic uppercase tracking-snug text-xl text-primary">
        {{ $static.metadata.siteName }}
      </g-link>
    </div>
    <div class="container max-w-screen-md mx-auto px-4">
      <Search />
    </div>
    <div>
      <ToggleDarkMode>
        Toggle Dark Mode
      </ToggleDarkMode>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Search from "@/components/Search";
import ToggleDarkMode from "@/components/ToggleDarkMode";

export default {
  components: {
    Search,
    ToggleDarkMode
  }
};
</script>

<style>
</style>