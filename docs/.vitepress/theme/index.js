import VPLTheme from '@lando/vitepress-theme-default-plus';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import { defineAsyncComponent, h } from 'vue';
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import 'vitepress-plugin-back-to-top/dist/style.css'

let readabilitiesPromise;
const importReadabilities = () => readabilitiesPromise ??= import('@nolebase/vitepress-plugin-enhanced-readabilities/client');

export default {
...VPLTheme,
async enhanceApp(ctx) {
  if (import.meta.env.SSR) return;
  if (typeof VPLTheme.enhanceApp === 'function') await VPLTheme.enhanceApp(ctx);
  const { NolebaseEnhancedReadabilitiesPlugin } = await importReadabilities();
  await import('@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css');
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
  if (import.meta.env.SSR) return baseSlots;
  const NolebaseEnhancedReadabilitiesMenu = defineAsyncComponent(() => importReadabilities().then(m => m.NolebaseEnhancedReadabilitiesMenu));
  const NolebaseEnhancedReadabilitiesScreenMenu = defineAsyncComponent(() => importReadabilities().then(m => m.NolebaseEnhancedReadabilitiesScreenMenu));
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
