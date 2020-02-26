<template>
  <Layout>
      <div class="flex flex-wrap items-start justify-start">

        <div class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky" style="top: 4rem">
          <OnThisPage />
        </div>

        <div class="order-1 w-full md:w-2/3">
          <div class="content" v-html="$page.markdownPage.content" />

          <div class="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-borderColor">
            <NextPrevLinks />
          </div>
        </div>

      </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  markdownPage(id: $id) {
    id
    title
    
    excerpt
    path
    timeToRead
    content
    sidebar
    next
    prev
    headings {
      depth
      value
      anchor
    }
  }
  allMarkdownPage{
    edges {
      node {
        path
        title
      }
    }
  }
}
</page-query>

<script>
import OnThisPage from '@/components/OnThisPage.vue';
import NextPrevLinks from '@/components/NextPrevLinks.vue';

export default {
  components: {
    OnThisPage,
    NextPrevLinks
  },
  
  metaInfo() {
    return {
      title: this.$page.markdownPage.title,
      meta: [
        { name: 'description', content: this.$page.markdownPage.description || this.$page.markdownPage.excerpt }
      ]
    }
  }
}
</script>

<style>
@import 'prism-themes/themes/prism-material-oceanic.css';
</style>