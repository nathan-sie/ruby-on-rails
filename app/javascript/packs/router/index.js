/*配置路由*/
// import Vue from 'vue'

// 导入路由插件
// import Router from 'vue-router'
// import home from "../components/home.vue";
import user from "../components/user.vue"
import Layout from "../layout/Layout.vue";
// Vue.use(Router);
import { createRouter, createWebHistory } from "vue-router"
// 配置路由

const routes = [
        {
            // 路由请求路径
            path: '/',
            // 路由名称,可以省略不写
            name: 'user',
            // 跳转到组件
            component: user
        }, {
            // 路由请求路径
            path: '/home',
            // 路由名称,可以省略不写
            name: 'home',
            // 跳转到组件
            component: Layout
        }
    ]
    // process.env.BASE_URL
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
