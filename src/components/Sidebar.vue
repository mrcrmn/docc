<template>
  <div ref="sidebar" class="p-4 max-h-screen overflow-y-auto">
    <div v-for="page in pages" :key="page.id" class="pb-2 border-b border-borderColor">
      <ul class="mb-0 px-0">
        <li
          v-for="heading in page.headings"
          :id="makeHeadingId(heading)"
          :key="heading.anchor"
          :class="getClassesForAnchor(page, heading)"
          v-show="heading.depth === 1 || page.path === $page.markdownPage.path"
        >
          <g-link
            :to="`${page.path}${heading.anchor}`"
            class="block py-1">
              {{ heading.value }}
          </g-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<static-query>
query Sidebar {
  allMarkdownPage{
    edges {
      node {
        path
        title
        headings {
        	depth
          value
          anchor
      	}
      }
    }
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      expanded: []
    };
  },
  computed: {
    pages() {
      return this.$static.allMarkdownPage.edges.map(edge => edge.node);
    }
  },
  watch: {
    $route: function () {
      this.scrollToActiveAnchor();
    }
  },
  methods: {
    getClassesForAnchor(page, heading) {
      const isH1 = heading.depth === 1;
      let offsetClass;

      switch(heading.depth) {
        case 1:
          offsetClass = 'pl-0';
          break;
        case 2:
          offsetClass = 'pl-2';
          break;
        case 3:
          offsetClass = 'pl-4';
          break;
        case 4:
          offsetClass = 'pl-6';
          break;
        default:
          offsetClass = 'pl-0';
      }

      return {
        [offsetClass]: true,
        "font-semibold mb-1 pt-3": isH1,
        "text-primary": this.isCurrentPage(page) && isH1
      };
    },
    isCurrentPage(page) {
      return page.path === this.$page.markdownPage.path;
    },
    makeHeadingId(heading) {
      return heading.anchor.slice(1) + "__link";
    },
    scrollToActiveAnchor() {
      if (process.isServer) {
        return;
      }

      const active = this.pages.find(page => this.isCurrentPage(page));
      const H1 = active.headings.find(heading => heading.depth === 1);

      const el = document.getElementById(this.makeHeadingId(H1));

      this.$nextTick(() => {
        this.$refs.sidebar.scrollTop = el.offsetTop;
      });
    }
  },
  mounted() {
    this.scrollToActiveAnchor();
  },
  
};
</script>
