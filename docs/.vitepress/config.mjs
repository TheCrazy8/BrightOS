import footnote from 'markdown-it-footnote'
import { defineConfig } from '@lando/vitepress-theme-default-plus/config'
import { presetMarkdownIt } from '@nolebase/integrations/vitepress/markdown-it'

const nolebaseMarkdownIt = presetMarkdownIt({
    bidirectionalLinks: false,
    unlazyImages: false,
    inlineLinkPreview: false,
});

const config = defineConfig({
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
});

const themeMarkdownConfig = config.markdown?.config;
config.markdown = config.markdown || {};
config.markdown.config = (md) => {
    nolebaseMarkdownIt.install(md);
    if (typeof themeMarkdownConfig === 'function') themeMarkdownConfig(md);
    md.use(footnote);
};

config.vite = config.vite || {};
config.vite.plugins = config.vite.plugins ?? [];
config.vite.optimizeDeps = config.vite.optimizeDeps || {};
config.vite.optimizeDeps.exclude = [
    ...(config.vite.optimizeDeps.exclude ?? []),
    '@nolebase/vitepress-plugin-enhanced-readabilities',
];
config.vite.ssr = config.vite.ssr || {};
const noExternal = [
    ...(config.vite.ssr.noExternal ?? []),
    '@lando/vitepress-theme-default-plus',
    '@nolebase/vitepress-plugin-enhanced-readabilities',
];
config.vite.ssr.noExternal = noExternal;

export default config;
