import VPLTheme from '@lando/vitepress-theme-default-plus';
import { h } from 'vue';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import vitepressBackToTop from 'vitepress-plugin-back-to-top';
import 'vitepress-plugin-back-to-top/dist/style.css';
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client';

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';

export default {
  ...VPLTheme,

  Layout: () =>
    h(VPLTheme.Layout, null, {
      // An enhanced readabilities menu for wider screens
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      // An enhanced readabilities menu for narrower screens (usually smaller than iPad Mini)
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    }),

  enhanceApp(ctx) {
    // Call base theme enhanceApp if it exists
    VPLTheme.enhanceApp?.(ctx);

    // Register global component (optional)
    ctx.app.component('vImageViewer', vImageViewer);

    // Enable back-to-top
    vitepressBackToTop({
      threshold: 300,
    });
  },

  setup() {
    const route = useRoute();
    // Enable the image viewer plugin
    imageViewer(route);
  },
};
