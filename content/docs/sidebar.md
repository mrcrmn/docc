---
description: ''
sidebar: 'docs'
prev: '/docs/settings/'
---

# Sidebar

To include a navigation sidebar on the left (like on this page, for example) or on mobile devices as an off-canvas navigation, adjust the settings in the global configuration, and add a reference to the sidebar in the frontmatter of each Markdown file.

## Global Configuration

Open the `gridsome.config.js` file. The configuration for the sidebar is located under `settings > sidebar`.

```js
// gridsome.config.js
module.exports = {
  // ...
  settings: {
    sidebar: []
  },
  // ...
}
```

Please note that the sidebar option is an array, so you can define multiple sidebars for different sections of your website. For example, you might have a sidebar for your user guide and another one for your API reference.

### The Sidebar Config Object

Each sidebar in this array requires the following properties:
- `name`: The identifier of the sidebar. This will be referenced in your Markdown frontmatter.
- `sections`: The sidebar is divided into several sections. On this page, we have **Getting Started** and **Configuration**.

```js
// gridsome.config.js
module.exports = {
  // ...
  settings: {
    sidebar: [
      name: 'docs',
      sections: []
    ]
  },
  // ...
}
```

A sample `sections` array might look like this:

```js
// gridsome.config.js
module.exports = {
  // ...
  settings: {
    sidebar: [
      name: 'docs',
      sections: [
        {
          title: 'Getting Started',
          items: [
            '/docs/',
            '/docs/installation/',
            '/docs/writing-content/',
          ]
        },
      ]
    ]
  },
  // ...
}
```

As you can see, we need a `title` for each section, and an array of `items`, which are the links to the pages in the section.

The sidebar performs a static query to get all pages. This is how we automatically put the title of the given page in the sidebar.

## Frontmatter setup

After your global configuration is all done, we only need to tell the Markdown page which sidebar to use.

To do that, we simply reference the `name` of the sidebar in our frontmatter:

```md
---
sidebar: 'docs'
---

# I use the docs sidebar
```