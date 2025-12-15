import VPLTheme from '@lando/vitepress-theme-default-plus';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import 'vitepress-plugin-back-to-top/dist/style.css'

export default {
...VPLTheme,
enhanceApp(ctx) {
VPLTheme.enhanceApp(ctx);
// Register global component (optional)
ctx.app.component('vImageViewer', vImageViewer);
  vitepressBackToTop({
      // default
      threshold:300
    })
},
setup() {
const route = useRoute();
// Enable the plugin
imageViewer(route);
}
};
