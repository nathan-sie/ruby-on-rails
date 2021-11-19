import ElementUI from 'element-ui'//引入elementui
import 'element-ui/lib/theme-chalk/index.css'//引入element
import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue'
import App from '../app.vue'
// Vue.use(TurbolinksAdapter)

import router from './router/index'

Vue.config.productionTip = false;
Vue.use(ElementUI)//使用elementui
document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    // elementui : new ElementUI(),
    router,
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)

  console.log(app)
})