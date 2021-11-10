import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { useStore } from '@/store'
export default function loadComponent(app: any) {
  app.use(ElementPlus, { size: useStore().state.app.size })
  // app.config.globalProperties.$message = ElMessage
}
