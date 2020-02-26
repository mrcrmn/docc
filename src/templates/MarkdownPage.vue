<template>
  <Layout>
      <div class="content" v-html="$page.markdownPage.content" />
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
  }
}
</page-query>

<script>

export default {
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