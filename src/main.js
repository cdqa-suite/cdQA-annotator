import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import DownloadData from 'v-download'
import selection from 'vue-text-selection'
import JsonViewer from 'vue-json-viewer'
import svg from 'svg-progress-bar'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

Vue.use(BootstrapVue);
Vue.use(DownloadData);
Vue.directive('selection', selection);
Vue.use(JsonViewer);
Vue.use(svg);
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  directives: { selection }
}).$mount('#app')



