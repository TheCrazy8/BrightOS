import VPLTheme from '@lando/vitepress-theme-default-plus';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import vitepressBackToTop from 'vitepress-plugin-back-to-top';
import 'vitepress-plugin-back-to-top/dist/style.css';
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';
import { NolebaseEnhancedReadabilitiesPlugin } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

export default {
  ...VPLTheme,
  enhanceApp(ctx) {
    // Call base theme enhanceApp if it exists
    VPLTheme.enhanceApp?.(ctx);
    ctx.app.use(NolebaseEnhancedReadabilitiesPlugin) 

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
