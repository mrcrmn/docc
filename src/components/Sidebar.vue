<template>
  <div
    ref="sidebar"
    v-if="showSidebar"
    class="pt-8 lg:pt-12 px-4"
  >
    <div
      v-for="(section, index) in sidebar.sections"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < sidebar.sections.length -1 }"
    >
      <h3 class="uppercase tracking-tight text-sm mb-1 border-none mt-0 pt-0">
        {{ section.title }}
      </h3>

      <ul class="mb-0 pl-2 max-w-full">
        <li
          v-for="page in findPages(section.items)"
          :id="page.path"
          :key="page.path"
          :class="getClassesForAnchor(page)"
          @mousedown="$emit('navigate')"
        >
          <g-link
            :to="`${page.path}`"
            class="flex items-center py-1 font-semibold"
          >
           <span
              class="w-2 h-2 bg-ui-primary rounded-full absolute -ml-3 transition duration-300 ease-out opacity-0 transform scale-0 origin-center"
              :class="{
                'opacity-100 scale-100': isCurrentPage(page)
              }"
            ></span>
            {{ page.title }}
          </g-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<static-query>
query Sidebar {
  metadata {
    settings {
      sidebar {
        name
        sections {
          title
          items
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
      return this.$page.allMarkdownPage.edges.map(edge => edge.node);
    },
    sidebar() {
      return this.$static.metadata.settings.sidebar.find(
        sidebar => sidebar.name === this.$page.markdownPage.sidebar
      );
    },
    showSidebar() {
      return this.$page.markdownPage.sidebar
        && this.sidebar;
    },
  },
  methods: {
    getClassesForAnchor(page) {
      return {
        "text-ui-primary": this.isCurrentPage(page),
        "transition duration-300 ease-out transform hover:translate-x-1 hover:text-ui-primary": ! this.isCurrentPage(page)
      };
    },
    isCurrentPage(page) {
      return page.path === this.$page.markdownPage.path;
    },
    findPages(links) {
      return links.map(link => this.pages.find(page => page.path === link));
    }
  },  
};
</script>
