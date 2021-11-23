/*配置路由*/
// import Vue from 'vue'

// 导入路由插件
import Router from 'vue-router'
import home from "../components/home";
import user from "../components/user"
import Layout from "../layout/Layout";
// Vue.use(Router);
import { createRouter, createWebHashHistory } from "vue-router"

// 配置路由
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
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
});
export default router