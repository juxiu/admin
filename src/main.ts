/*
 * @Description:
 * @Autor: ZY
 * @Date: 2020-12-07 10:30:20
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 19:20:07
 */
import { createApp } from 'vue'
import App from './App.vue'
// import './pwa/registerServiceWorker'
import router from './router'
import { store } from './store'
import { loadAllPlugins } from './plugins'
import '@/assets/iconfont/iconfont.css'
import '@/styles/index.scss'
import 'normalize.css'
import '@/permission'

const app = createApp(App)
// 加载所有插件
loadAllPlugins(app)

console.log(process.env.VUE_APP_BASE_API)


app.use(store).use(router).mount('#app')
