import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入index组件
import index from './components/index.vue'
// 引入商品详情页
import goodslist from './components/goodslist.vue';
// 导入模块
import axios from "axios";
// 引入懒加载
import VueLazyLoad from 'vue-lazyload'
// 轮播图
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入模块 moment
import moment from "moment";
// 引入图钉模块
import iView from 'iview';
import 'iview/dist/styles/iview.css';

axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 挂载到Vue的原型上->Vue实例化出来的对象 共用 vue-resource this.$http
Vue.prototype.axios = axios;
// 使用路由中间件
Vue.use(VueRouter);
// 懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/statics/img/01.gif'),
})
Vue.use(ElementUI);
// 图钉
Vue.use(iView);

// 全局过滤器
Vue.filter('cutTime',function(value){
    // 默认的切割方式 不够通用
    // 使用moment.js替换
      // return value.slice(0,10);
      // 使用moment.js进行替换
      return moment(value).format("YYYY年MM月DD日")
})

// 注册路由规则
const router = new VueRouter({
  routes:[
    // 访问的是 / 打到(重定向)
    { path: '/', redirect: '/index' },
    // index 都显示 index这个组件
    {
      path:'/index',
      component:index
    },
    {
      path:'/goodslist/:id',
      component:goodslist
    }
  ]
})



Vue.config.productionTip = false
// 引入css
import "./assets/statics/site/css/style.css";

new Vue({
  // 选择器
  el:"#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App)
})
