<template>
  <div
    @keydown.down="increment"
    @keydown.up="decrement"
    @keydown.enter="go"
    class="relative"
  >
    <label>
      <span class="sr-only">Search Documentation</span>
      <input
        ref="input"
        type="search"
        v-model="query"
        class="block px-4 py-2 bg-sidebar border-2 border-sidebar rounded-lg focus:bg-background w-full"
        :class="{'rounded-b-none': showResult,}"
        placeholder="Search Documentation..."
        @focus="focused = true"
        @blur="focused = false"
        @input="focusIndex = -1"
      />
    </label>
    <div v-if="showResult" class="results bg-background absolute rounded-lg rounded-t-none shadow-lg border-2 border-t-0 border-sidebar z-50 inset-x-0">
      <ul class="py-2 px-4 m-0">
        <li v-if="results.length === 0" class="px-2">
          No results for <span class="font-bold">{{ query }}</span>.
        </li>

        <li
          v-else
          v-for="(result, index) in results"
          :key="result.path + result.anchor"
          @mouseenter="focusIndex = index"
          @mousedown="go"
          class="border-sidebar"
          :class="{
            'border-b': index + 1 !== results.length
          }"
        >
          <g-link
            :to="result.path + result.anchor"
            class="block rounded-lg -mx-2 p-2 font-bold text-base"
            :class="{
              'bg-sidebar text-primary': focusIndex === index,
            }"
          >

            <span v-if="result.value === result.title">
              {{ result.value }}
            </span>

            <span v-else class="flex items-center">
              {{ result.title }}
              <ChevronRightIcon size="1x" class="mx-1" />
              <span class="font-normal opacity-75">{{ result.value }}</span>
            </span>

          </g-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<static-query>
query Search {
   allMarkdownPage{
    edges {
      node {
        id
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
import Fuse from 'fuse.js';
import { ChevronRightIcon } from 'vue-feather-icons';

export default {
  components: {
    ChevronRightIcon
  },

  data() {
    return {
      query: '',
      focusIndex: -1,
      focused: false
    };
  },
  computed: {
    results() {
      const fuse = new Fuse(this.headings, {
        keys: ['value'],
        threshold: .25
      });

      return fuse.search(this.query).slice(0, 15);
    },
    headings() {
      let result = [];
      const allPages = this.$static.allMarkdownPage.edges.map(edge => edge.node);

      // Create the array of all headings of all pages.
      allPages.forEach(page => {
        page.headings.forEach(heading => {
          result.push({
            ...heading,
            path: page.path,
            title: page.title
          });
        });
      });

      return result;
    },
    showResult() {
      // Show results, if the input is focused and the query is not empty.
      return this.focused && this.query.length > 0;
    }
  },
  methods: {
    increment() {
      if (this.focusIndex < this.results.length - 1) {
        this.focusIndex++;
      }
    },
    decrement() {
      if (this.focusIndex >= 0) {
        this.focusIndex--;
      }
    },
    go() {
      // Do nothing if we don't have results.
      if (this.results.length === 0) {
        return;
      }

      let result;

      // If we don't have focus on a result, just navigate to the first one.
      if (this.focusIndex === -1) {
        result = this.results[0];
      } else {
        result = this.results[this.focusIndex];
      }

      this.$router.push(
        result.path + result.anchor
      );

      // Unfocus the input and reset the query.
      this.$refs.input.blur();
      this.query = '';
    }
  }

};
</script>

<style>
</style>