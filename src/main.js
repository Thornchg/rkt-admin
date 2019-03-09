// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vue/components'
import './assets/css/app.less'
import './axios-config'
Vue.config.productionTip = false;
Vue.use(HeyUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
