import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import VueHighlightJS from 'vue-highlightjs'
import DownloadData from 'v-download'
import selection from 'vue-text-selection'
import JsonViewer from 'vue-json-viewer'

Vue.use(BootstrapVue);
Vue.use(VueHighlightJS);
Vue.use(DownloadData);
Vue.directive('selection', selection);
Vue.use(JsonViewer);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  directives: { selection }
}).$mount('#app')



