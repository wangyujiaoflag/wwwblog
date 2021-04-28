import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import animate from 'animate.css'
// import Nprogess from 'nprogress'
Vue.use(ElementUI)
// Vue.use(animate)
// Vue.use(Nprogess)

import VueMarkdownEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
Vue.use(VMdPreview);
Vue.use(VueMarkdownEditor);
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
VMdPreview.use(githubTheme);
VueMarkdownEditor.use(vuepressTheme);
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createLineNumbertPlugin());



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
