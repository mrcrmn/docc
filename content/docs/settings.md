---
description: ''
sidebar: 'docs'
prev: '/docs/deploying/'
next: '/docs/sidebar/'
---

# Settings

Using all features of this starter theme requires a bit of configuration.

## Sidebar

The sidebar, unfortunately, is not generated automatically but rather configured in your frontmatter and the `gridsome.config.js` file.
Check out the [sidebar](/docs/sidebar/) section for more information.

## Next and Previous Navigation

If you scroll to the bottom of the page, you will notice some buttons that link to other pages in these docs. These are also not automatically generated, but configured in the frontmatter of your Markdown file like this:

```md
prev: '/docs/previous-link/'
next: '/docs/next-link/'
```

Just like the sidebar, you only need to specify the link to the page and the title will be fetched via a GraphQL query.

## Navigation

The standard navigation on the top left is defined in the `gridsome.config.js` file. The configuration is very simple. It just needs a `settings > nav` property, which takes a `links` property that defines each link that should be displayed at the top.

```js
module.exports = {
  settings: {
    nav: {
      links: [
        { path: '/docs/', title: 'Docs' }
      ]
    },
  }
}
```

Each link item needs a `path` and a `title` for the link.

## Description

Description metadata can be defined in the frontmatter of each page. It is optional but recommended, since this value is used for link previews and on search results pages.

```md
---
description: 'your description'
---
```

## Social Links

At the top of the page, you can see a few icons that link to another website, Twitter, or GitHub profile. These links are also defined in the `gridsome.config.js` file like this:

```js

module.exports = {
  settings: {
    web: process.env.URL_WEB,
    twitter: process.env.URL_TWITTER,
    github: process.env.URL_GITHUB,
  }
```

These are read from your `.env` file by default, but can be hardcoded in the `gridsome.config.js` file if you prefer.

## On this Page

The right sidebar contains a table of contents that shows the headings on the current page. Fortunately, this list is auto-generated and you don't need to do anything.

## Google Analytics

Google Analytics is integrated via the `@gridsome/plugin-google-analytics` plugin. It needs your tracking ID to work correctly. You can define this in your `.env` file or hardcode it in the `gridsome.config.js` file if you prefer.

If you don't want to use Google Analytics, simply delete this entry from your `plugins`.

For more information on the analytics plugin, see the [Gridsome Docs](https://gridsome.org/plugins/@gridsome/plugin-google-analytics).

```js
// ...
{
  use: '@gridsome/plugin-google-analytics',
  options: {
    id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
  }
}
// ...
```