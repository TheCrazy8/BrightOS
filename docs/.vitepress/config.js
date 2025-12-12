import footnote from 'markdown-it-footnote'

export default{
    title: "B&C Official",
    description: "The Blaze & Company official site.",
    base: "/Blaze-And-Company-Official/",
    markdown: {
        config: (md) => {
      md.use(footnote)
        }
    },
    themeConfig: {
        siteTitle: "Blaze & Company",
        footer: {
            message: "Released under the CC BY-NC-ND 4.0 License.",
            copyright: "Copyright © 2025-present TheCrazy8",
        },
        nav: [
        ],
        sidebar: [
        ],
        
        lastUpdated: {
              text: 'Updated at',
              formatOptions: {
                    dateStyle: 'full',
                    timeStyle: 'medium'
              }
        },
        search: {
              provider: 'local'
        },
    },
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
    ],
    vite: {
        ssr: {
            noExternal: ['@lando/vitepress-theme-default-plus']
        }
    }
};
