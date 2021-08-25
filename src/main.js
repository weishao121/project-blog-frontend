// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import { sync } from 'vuex-router-sync'
import vuetify from '@/plugins/vuetify'
import MediumEditor from 'vuejs-medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'vuejs-medium-editor/src/themes/default.css'
import 'highlight.js/styles/github.css'

Vue.config.productionTip = false

Vue.component('medium-editor', MediumEditor)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  components: { App },
  template: '<App/>'
})
