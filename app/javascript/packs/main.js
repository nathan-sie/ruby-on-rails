// import router from 'router/index'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import 'element-plus/theme-chalk/index.css'
import App from '../app.vue'
import router from "./router";
import store from './store';
import user from '../packs/components/user.vue';
import Aside from '../packs/components/Aside.vue';
import Header from '../packs/components/Header.vue';
import home from '../packs/components/home.vue';
import Layout from "../packs/layout/Layout.vue";

export default () => {
// Vue.config.productionTip = false;
document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App).use(ElementPlus).use(router).use(store)
  app.component(user)
  app.component(Aside)
  app.component(Header)
  app.component(home)
  app.component(Layout)
  app.mount( '#app')
  console.log(app)
//   const app = createApp({
//     // elementplus : new ElementPlus(),
//     router,
//     render: h => h(App)
//   }).mount('#app')
//   document.body.appendChild(app.$el)
//
//   console.log(app)
  // app.config.productionTip = false
})
}
// document.addEventListener('DOMContentLoaded:before-render', () => {
//   if (app) app.unmount();
// });
