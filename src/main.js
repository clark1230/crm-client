import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import VueResource from 'vue-resource';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import jquery from 'jquery'; //使用jquery库


Vue.use(VueRouter);
Vue.use(VueResource);

Vue.use(iView);
Vue.prototype.$axios = axios;
Vue.prototype.$ = jquery;

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    
    router: router,
    render: h => h(App)
}).$mount('#app');