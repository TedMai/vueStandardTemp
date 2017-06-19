import Vue from 'vue'

// 引用外部插件----------------------------
// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Routes from './router'
const router = new VueRouter({
  Routes
})
// 引用外部插件----------------------------

// api请求server的目录
import Api from './api'
Vue.prototype.$Api = Api

// 配置文件----------------------------
// 共用常量配置文件
import Constant from './config/constant.js'
Vue.prototype.$Constant = Constant
// 配置碎片
import Fragment from './config/fragment.js'
Vue.prototype.$Fragment = Fragment
// 翻译配置文件
import Translate from './config/translate.js'
Vue.prototype.$Translate = Translate
// 单位配置文件
import CustomUnit from './config/unit.js'
Vue.prototype.$CustomUnit = CustomUnit
// 配置文件----------------------------

//

// 项目工具型函数----------------------------
// 自定义的共用方法
import CustomMethods from './utils/custom-methods.js'
Vue.prototype.$CustomMethods = CustomMethods
// 自定义的验证方法
import Validator from './utils/validator.js'
Vue.prototype.$Validator = Validator
// 项目工具型函数----------------------------

// 引用自定义全局组件----------------------------
// 日期范围组件
import DateRange from './components/date-range.vue'
Vue.component('date-range', DateRange)
// 省市级联组件
import ChinaCity from './components/china-city.vue'
Vue.component('china-city', ChinaCity)
// 上传组件
import UpFile from './components/upfile.vue'
Vue.component('up-file', UpFile)
// 引用自定义全局组件----------------------------

// 自定义全局指令----------------------------
// 翻译指令
Vue.directive('translate', function (el, binding) {
  function bindingValue (value) {
    if (value.indexOf('_photo') !== -1) {
      return value.split('_photo')[0]
    } else {
      return value
    }
  }
  el.innerHTML = Translate[binding.value] ? Translate[binding.value] : bindingValue(binding.value)
})
// 添加单位指令
Vue.directive('customunit', function (el, binding) {
  el.innerHTML = CustomUnit[binding.value] ? CustomUnit[binding.value] : ''
})
// 自定义全局指令----------------------------

import App from './App'
/* eslint-disable no-new */
new Vue({ // eslint-disable-line no-new
  router,
  el: '#app',
  render: (h) => h(App)
})
