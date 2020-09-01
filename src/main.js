import Vue from 'vue' // импорт фреймворка
import App from './App.vue' // импорт главного компонента app.vue
import router from './router' // импорт аддона роутер
import store from './store' // импорт аддона стор
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './scss/custom.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin) // установка исходного кода



Vue.config.productionTip = false

new Vue({
  router,// configs
  store,
  render: h => h(App)
}).$mount('#app')
