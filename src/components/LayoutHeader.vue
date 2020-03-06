<template>
  <div class="py-2 border-t-2 border-ui-primary">
    <div class="container">

      <div class="-mx-2 sm:-mx-4 flex justify-between items-center">
        <div class="px-2 sm:px-4 flex items-center mr-auto">
          <g-link
            to="/"
            class="flex items-center text-ui-primary"
            title="Home"
          >
            <Logo :width="40" />
            <span class="hidden sm:block font-black uppercase tracking-tighter text-xl ml-2">
              {{ meta.siteName }}
            </span>
          </g-link>

          <OverflowContainer
            v-if="settings.nav.links.length > 0"
            class="ml-2 sm:ml-8 mr-3"
          >
            <div class="nav flex py-1">
              <g-link
                v-for="link in settings.nav.links"
                :key="link.path"
                :to="link.path"
                class="nav-link font-medium text-sm sm:text-base py-1 px-1 mr-2 border-b-2 border-ui-background transition-colors duration-300 ease-out hover:text-ui-primary"
              >
                {{ link.title }}
              </g-link>
            </div>
          </OverflowContainer>
        </div>

        <div class="px-2 sm:px-4 w-full max-w-screen-xs">
          <ClientOnly>
            <Search />
          </ClientOnly>
        </div>

        <div class="px-2 sm:px-4 flex justify-end items-center">

          <a v-if="settings.web" :href="settings.web" class="hidden sm:block ml-3" target="_blank" rel="noopener noreferrer" title="Website" name="Website">
            <GlobeIcon size="1.5x" />
          </a>

          <a v-if="settings.twitter" :href="settings.twitter" class="hidden sm:block ml-3" target="_blank" rel="noopener noreferrer" title="Twitter" name="Twitter">
            <TwitterIcon size="1.5x" />
          </a>

          <a v-if="settings.github" :href="settings.github" class="sm:ml-3" target="_blank" rel="noopener noreferrer" title="GitHub" name="GitHub">
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
import ToggleDarkMode from "@/components/ToggleDarkMode";
import OverflowContainer from "@/components/OverflowContainer";
import Logo from '@/components/Logo';
import { SunIcon, MoonIcon, GlobeIcon, GithubIcon, TwitterIcon } from "vue-feather-icons";

// The sites index might be large, so we just lazy load the whole component.
const Search = () => import(/* webpackChunkName: "search" */ "@/components/Search").catch(error => console.warn(error));

export default {
  components: {
    Logo,
    OverflowContainer,
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
  svg:not(.feather-search) {
    @apply transition-colors duration-300 ease-out;
  
    &:hover {
      @apply text-ui-primary;
    }
  }
}

.nav {
  max-width: 10rem;

  @screen md {
    max-width: initial;
  }
}

.nav-link {
  &.active {
    @apply text-ui-primary font-bold border-ui-primary;
  }
}
</style>