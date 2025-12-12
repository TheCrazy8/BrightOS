import VPLTheme from '@lando/vitepress-theme-default-plus';
import { NolebaseEnhancedReadabilitiesMenu, NolebaseEnhancedReadabilitiesPlugin, NolebaseEnhancedReadabilitiesScreenMenu } from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import { h } from 'vue';
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import 'vitepress-plugin-back-to-top/dist/style.css'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';

export default {
...VPLTheme,
enhanceApp(ctx) {
VPLTheme.enhanceApp(ctx);
  ctx.app.use(NolebaseEnhancedReadabilitiesPlugin);
// Register global component (optional)
ctx.app.component('vImageViewer', vImageViewer);
  vitepressBackToTop({
      // default
      threshold:300
    })
},
enhanceLayout() {
  const baseSlots = typeof VPLTheme.enhanceLayout === 'function' ? VPLTheme.enhanceLayout() : {};
  const enhancedSlots = {
    'nav-bar-content-after': [() => h(NolebaseEnhancedReadabilitiesMenu)],
    'nav-screen-content-after': [() => h(NolebaseEnhancedReadabilitiesScreenMenu)],
  };
  const merged = { ...(baseSlots || {}) };
  for (const key of Object.keys(enhancedSlots)) {
    merged[key] = [ ...(merged[key] || []), ...(enhancedSlots[key] || []) ];
  }
  return merged;
},
setup() {
const route = useRoute();
// Enable the plugin
imageViewer(route);
}
};
