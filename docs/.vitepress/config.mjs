import footnote from 'markdown-it-footnote'
import { defineConfig } from 'vitepress'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(footnote)
    }
  },
  title: "B&C Official",
  description: "The Blaze & Company official site.",
  base: "/Blaze-And-Company-Official/",
  themeConfig: {
    siteTitle: "Blaze & Company",
    footer: {
      message: "Released under the CC BY-NC-ND 4.0 License.",
      copyright: "Copyright © 2025-present TheCrazy8",
    },
    nav: [
      { text: 'Key', link: '/key' },
      { text: 'Products', link: '/products'},
    ],
    sidebar: [],
    lastUpdated: {
      text: 'Updated',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: { provider: 'local' }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
  ],
  vite: {
    ssr: {
      noExternal: ['@lando/vitepress-theme-default-plus']
    }
  }
})
