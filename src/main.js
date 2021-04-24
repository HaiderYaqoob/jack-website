import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import Toasted from 'vue-toasted'
import VueResource from 'vue-resource'
// import { store } from './store/store'

const ToastedOptions = {
  position: 'bottom-center',
  duration: 4000,
  theme: 'bubble'
}

Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(Toasted, ToastedOptions)
Vue.use(VueResource)

new Vue({
  // store,
  render: h => h(App),
}).$mount('#app')
