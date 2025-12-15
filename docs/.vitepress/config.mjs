import footnote from 'markdown-it-footnote'
import { defineConfig } from '@lando/vitepress-theme-default-plus/config'
import { presetMarkdownIt } from '@nolebase/integrations/vitepress/markdown-it'
import { enhancedReadabilities } from '@nolebase/vitepress-plugin-enhanced-readabilities'

const nolebaseMarkdownIt = presetMarkdownIt({
    bidirectionalLinks: true,
    unlazyImages: true,
    inlineLinkPreview: true,
});

const config = defineConfig({
    title: "B&C Official",
    description: "The Blaze & Company official site.",
    base: "/Blaze-And-Company-Official/",
    markdown: {
        config: (md) => {
            md.use(footnote);
        },
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
        optimizeDeps: { 
          exclude: [ 
            '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
            'vitepress', 
            '@nolebase/ui', 
          ], 
        }, 
        ssr: { 
          noExternal: [ 
            // If there are other packages that need to be processed by Vite, you can add them here.
            '@nolebase/vitepress-plugin-enhanced-readabilities', 
            '@nolebase/ui', 
          ], 
        }, 
      }, 
});

const themeMarkdownConfig = config.markdown?.config;
config.markdown = config.markdown || {};
config.markdown.config = (md) => {
    nolebaseMarkdownIt.install(md);
    if (typeof themeMarkdownConfig === 'function') themeMarkdownConfig(md);
};

export default config;
