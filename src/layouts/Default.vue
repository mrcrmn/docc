<template>
  <div class="font-sans antialiased text-typo bg-background">
    <div class="flex flex-wrap flex-col min-h-screen justify-start">
      <header
        ref="header"
        class="bg-background h-16 w-full sticky top-0 border-b border-borderColor z-10"
        @resize="setHeaderHeight"
      >
        <LayoutHeader />
      </header>
      <aside
        v-if="$page"
        class="bg-sidebar mt-16 w-full sm:max-w-sm border-r border-borderColor fixed left-0 top-0"
      >
        <Sidebar />
      </aside>

      <main class="max-w-full bg-background pb-20 flex-1" :class="{'pl-sm': $page}">
        <div class="container max-w-screen-md mx-auto px-4">
          <slot />
        </div>
      </main>
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

export default {
  components: {
    Sidebar,
    LayoutHeader
  },
  data() {
    return { headerHeight: 0 };
  },
  methods: {
    setHeaderHeight() {
      this.headerHeight = this.$refs.header.clientHeight;
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
  --color-primary: theme('colors.green.700');
}

html[lights-out] {
  --color-background: theme('colors.black');
  --color-typo: theme('colors.gray.100');
  --color-sidebar: theme('colors.gray.900');
  --color-borderColor: theme('colors.gray.800');
  --color-primary: theme('colors.green.500');
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
  @apply leading-snug font-black mb-4 -mt-12 pt-20;

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

h2,
h3 {
  @apply border-b border-gray-300 pb-1 mb-3;
}

h2 + h3,
h2 + h2,
h3 + h3 {
  @apply border-none -mt-20;
}

h4 {
  @apply text-lg;
}

p,
ol,
ul,
pre {
  @apply mb-4 text-base;
}

.content {
  a {
    @apply text-primary underline;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  ol,
  ul {
    @apply pl-3 py-1;
  }
}

blockquote {
  @apply border-l-4 border-borderColor py-4 pl-4;
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
</style>
