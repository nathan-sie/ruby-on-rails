// import router from 'router/index'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from '../app.vue'
import {router} from "./router/index";

// Vue.config.productionTip = false;
document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App).use(ElementPlus).use(router).mount('#app')
//   const app = createApp({
//     // elementplus : new ElementPlus(),
//     router,
//     render: h => h(App)
//   }).mount('#app')
//   document.body.appendChild(app.$el)
//
//   console.log(app)
})
// app.config.productionTip = false