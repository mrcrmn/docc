<template>
  <div class="font-sans antialiased text-typo bg-background">
    <div class="flex flex-col min-h-screen justify-start">

      <header
        ref="header"
        class="bg-background w-full sticky top-0 border-b border-borderColor z-10"
        @resize="setHeaderHeight"
      >
        <LayoutHeader />
      </header>

      <main class="relative w-full flex-1 container bg-background flex flex-wrap justify-start">

        <aside
          v-if="hasSidebar"
          class="sidebar"
          :class="{ 'open': sidebarOpen }"
          :style="sidebarStyle"
        >
          <div class="bg-background w-full pb-16">
            <Sidebar @navigate="sidebarOpen = false" />
          </div>
        </aside>

        <div
          class="w-full pb-24"
          :class="{'pl-0 lg:pl-12 lg:w-3/4': hasSidebar}"
        >
          <slot />
        </div>

      </main>

    </div>

    <div v-if="hasSidebar" class="fixed bottom-0 right-0 p-8 lg:hidden z-50">
      <button class="rounded-full shadow-lg text-white p-3 bg-primary hover:text-white" @click="sidebarOpen = ! sidebarOpen">
        <XIcon v-if="sidebarOpen" />
        <MenuIcon v-else />
      </button>
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
import Sidebar from "@/components/Sidebar";
import LayoutHeader from "@/components/LayoutHeader";
import { MenuIcon, XIcon } from 'vue-feather-icons';

export default {
  components: {
    Sidebar,
    LayoutHeader,
    MenuIcon,
    XIcon
  },
  data() {
    return {
      headerHeight: 0,
      sidebarOpen: false,
    }
  },
  watch: {
    sidebarOpen: function(isOpen) {
      document.body.classList.toggle('overflow-hidden', isOpen);
    }
  },
  methods: {
    setHeaderHeight() {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight;
      });
    }
  },
  computed: {
    sidebarStyle() {
      return {
        top: this.headerHeight + 'px',
        height: `calc(100vh - ${this.headerHeight}px)`
      }
    },
    hasSidebar() {
      return this.$page && this.headerHeight > 0;
    }
  },
  mounted() {
    this.setHeaderHeight();
  }
};
</script>

<style lang="scss">
:root {
  --color-background: theme('colors.white');
  --color-typo: theme('colors.gray.700');
  --color-sidebar: theme('colors.gray.200');
  --color-borderColor: theme('colors.gray.300');
  --color-primary: theme('colors.indigo.600');
}

html[lights-out] {
  --color-background: theme('colors.gray.900');
  --color-typo: theme('colors.gray.100');
  --color-sidebar: theme('colors.gray.800');
  --color-borderColor: theme('colors.gray.800');
  --color-primary: theme('colors.indigo.500');

  pre[class*="language-"],
  code[class*="language-"] {
    @apply bg-borderColor;
  }
}

* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

h1,
h2,
h3,
h4 {
  @apply leading-snug font-black mb-4;

  &:hover {
    a::before {
      @apply opacity-100;
    }
  }

  a {
    &::before {
      content: "#";
      margin-left: -1em;
      padding-right: 1em;
      @apply text-primary absolute opacity-0 float-left;
    }
  }
}

h1 {
  @apply text-4xl;
}

h2 {
  @apply text-2xl;
}

h3 {
  @apply text-xl;
}

h4 {
  @apply text-lg;
}

p,
ol,
ul,
pre,
blockquote {
  @apply mb-4 text-base;
}

.content {
  a {
    @apply text-primary underline;
  }

  h1, h2, h4, h4 {
    @apply -mt-12 pt-20;
  }
    
  h2 + h3,
  h2 + h2,
  h3 + h3 {
    @apply border-none -mt-20;
  }

  h2,
  h3 {
    @apply border-b border-borderColor pb-1 mb-3;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  ol,
  ul {
    @apply pl-5 py-1;

    li {
      @apply mb-2;

      &:last-child {
        @apply mb-0;
      }
    }
  }
}

blockquote {
  @apply border-l-4 border-borderColor py-2 pl-4;

  p:last-child {
    @apply mb-0;
  }
}

code {
  @apply px-1 py-1 bg-sidebar font-mono border-b border-r border-borderColor text-sm rounded;
}

pre[class*="language-"] {
  @apply max-w-full overflow-x-auto rounded;

  & + p {
    @apply mt-4;
  }

  & > code[class*="language-"] {
    @apply border-none leading-relaxed;
  }
}

header {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

table {
  @apply text-left mb-6;

  td, th {
    @apply py-3 px-4;
    &:first-child {
      @apply pl-0;
    }
    &:last-child {
      @apply pr-0;
    }
  }

  tr {
    @apply border-b border-borderColor;
    &:last-child {
      @apply border-b-0;
    }
  }
}

.sidebar {
  @apply fixed bg-background px-4 inset-x-0 bottom-0 w-full border-r border-borderColor overflow-y-auto transition-transform duration-300 ease-in-out z-40;
  transform: translateX(-100%);

  &.open {
    transform: translateX(0);
  }

  @screen lg {
    @apply w-1/4 px-0 bg-transparent top-0 bottom-auto inset-x-auto sticky z-0;
    transform: translateX(0);
  }
}
</style>
