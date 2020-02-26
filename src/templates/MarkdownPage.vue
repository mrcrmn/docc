<template>
  <Layout>
      <div class="flex flex-wrap items-start justify-start">
        <div class="order-2 w-full md:w-1/3 pl-8 sticky" style="top: 4rem">
          <OnThisPage />
        </div>
        <div class="order-1 w-full md:w-2/3">
          <div class="content" v-html="$page.markdownPage.content" />
        </div>
      </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  markdownPage(id: $id) {
    id
    title
    path
    timeToRead
    content
    headings {
      depth
      value
      anchor
    }
  }
}
</page-query>

<script>
import OnThisPage from '@/components/OnThisPage.vue';

export default {
  components: {
    OnThisPage
  },
  
  metaInfo() {
    return {
      title: this.$page.markdownPage.title
    }
  }
}
</script>

<style>
@import 'prism-themes/themes/prism-material-oceanic.css';
</style>