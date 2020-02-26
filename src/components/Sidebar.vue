<template>
  <div ref="sidebar" class="pt-8 px-4">
    <div>
      <ul class="mb-0 px-0 max-w-full">
        <li
          v-for="page in pages"
          :id="page.path"
          :key="page.path"
          :class="getClassesForAnchor(page)"
        >
          <g-link
            :to="`${page.path}`"
            class="flex items-center py-1 font-semibold">
              <span v-if="isCurrentPage(page)" class="w-2 h-2 rounded-full bg-primary mr-2"></span>
              {{ page.title }}
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
  methods: {
    getClassesForAnchor(page) {
      return {
        "text-primary": this.isCurrentPage(page),
        "transition duration-200 ease-out transform hover:translate-x-1 hover:text-primary": ! this.isCurrentPage(page)
      };
    },
    isCurrentPage(page) {
      return page.path === this.$page.markdownPage.path;
    },
  },  
};
</script>
