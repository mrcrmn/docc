<template>
  <div class="py-2 border-t-2 border-primary">
    <div class="container">

      <div class="-mx-2 sm:-mx-4 flex justify-between items-center">
        <div class="px-2 sm:px-4 flex flex-col sm:flex-row items-center mr-auto">
          <g-link
            to="/"
            class="flex items-center text-primary"
          >
            <svg width="40" height="28.0" viewBox="0 0 50 42">
              <path fill="currentColor" fill-rule="nonzero" d="M21.3 13.56l5.81 12.46-10.95-2.3-5.81-12.46 10.95 2.3zm20.86-9.73l5.81 12.46-10.95-2.3-5.81-12.46 10.95 2.3zm-8.91 36.83L8.44 36.19 16 24.99l12.1 2.54c.05.01.09.01.13.01.09 0 .18-.02.27-.06.01 0 .01-.01.01-.01.03-.01.05-.04.08-.06.03-.02.05-.05.08-.07.03-.03.07-.05.09-.08l8.11-12.01 11.19 2.35-14.81 23.06zm16.45-23.3c.01-.02.02-.03.03-.05.01-.05-.02-.08-.03-.13 0-.07.01-.13-.02-.2-.01-.02.01-.05-.01-.07L43.19 3c-.01-.02-.03-.02-.03-.03-.04-.07-.11-.11-.18-.16-.07-.05-.12-.11-.2-.14-.02-.01-.02-.02-.04-.03L30.22.01c-.04-.01-.08.03-.13.03-.07 0-.13 0-.19.02-.03.01-.06-.01-.08 0-.01.01-.02.03-.03.03-.05.03-.08.07-.12.12-.03.03-.08.03-.11.07l-8.11 12.01-12.1-2.54c-.05-.01-.08.02-.13.02-.07 0-.12 0-.19.02-.03.01-.06-.01-.08.01-.02.01-.02.03-.03.03-.05.03-.08.07-.12.12-.03.03-.08.03-.11.07L.34 22.37c-.02.02 0 .05-.02.08-.04.08-.04.15-.05.23-.01.08-.02.16.01.24.02.03 0 .05.01.08l6.49 13.91c.01.02.03.03.05.05.02.04.04.06.07.09.03.03.05.06.08.08.01.01.01.03.02.04 0 0 .01 0 .01.01.05.03.11.04.17.05.03.01.04.04.06.04l26.2 4.72a.61.61 0 0 0 .48-.12c.03-.02.05-.05.08-.07.03-.03.07-.05.1-.09l15.54-24.18c.02-.02 0-.05.01-.07.02-.04.03-.07.05-.1z"></path>
            </svg>
            <span class="hidden sm:block font-black uppercase tracking-tighter text-xl ml-2">
              {{ meta.siteName }}
            </span>
          </g-link>

          <div v-if="settings.nav.links.length > 0" class="hidden sm:block ml-2 sm:ml-8 mr-5">
            <g-link
              v-for="link in settings.nav.links"
              :key="link.path"
              :to="link.path"
              class="nav-link block font-medium p-1 border-b-2 border-background transition-colors duration-300 ease-out hover:text-primary"
            >
              {{ link.title }}
            </g-link>
          </div>
        </div>

        <div class="px-2 sm:px-4 w-full max-w-screen-xs">
          <Search />
        </div>

        <div class="px-2 sm:px-4 flex justify-end items-center">

          <a v-if="settings.web" :href="settings.web" class="hidden sm:block ml-3" target="_blank" rel="noopener noreferrer" title="Website" name="Website">
            <GlobeIcon size="1.5x" />
          </a>

          <a v-if="settings.twitter" :href="settings.twitter" class="hidden sm:block ml-3" target="_blank" rel="noopener noreferrer" title="Twitter" name="Twitter">
            <TwitterIcon size="1.5x" />
          </a>

          <a v-if="settings.github" :href="settings.github" class="sm:ml-3" target="_blank" rel="noopener noreferrer" title="Github" name="Github">
            <GithubIcon size="1.5x" />
          </a>

          <ToggleDarkMode class="ml-2 sm:ml-8">
            <template slot="default" slot-scope="{ dark }">
              <MoonIcon v-if="dark" size="1.5x" />
              <SunIcon v-else size="1.5x" />
            </template>
          </ToggleDarkMode>

        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    settings {
      web
      github
      twitter
      nav {
        links {
          path
          title
        }
      }
    }
  }
}
</static-query>

<script>
import Search from "@/components/Search";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import { SunIcon, MoonIcon, GlobeIcon, GithubIcon, TwitterIcon } from "vue-feather-icons";

export default {
  components: {
    Search,
    ToggleDarkMode,
    SunIcon,
    MoonIcon,
    GlobeIcon,
    GithubIcon,
    TwitterIcon
  },

  computed: {
    meta() {
      return this.$static.metadata;
    },
    settings() {
      return this.meta.settings;
    }
  }
};
</script>

<style lang="scss">
header {
  svg {
    @apply transition-colors duration-300 ease-out;
  
    &:hover {
      @apply text-primary;
    }
  }
}

.nav-link {
  &.active {
    @apply text-primary font-bold border-primary;
  }
}
</style>