import { createVNode, render } from 'vue'
import Toast from '../components/common/Toast.vue'

let currentToast = null

export const showToast = (message, options = {}) => {
  const duration = options.duration || 2000
  const type = options.type || 'info'

  // 如果已经有toast在显示，先移除它
  if (currentToast) {
    document.body.removeChild(currentToast.el)
    currentToast = null
  }

  // 创建容器
  const container = document.createElement('div')
  container.className = 'toast-container'
  
  // 创建toast组件的vnode
  const vnode = createVNode(Toast, {
    message,
    type,
    onDestroy: () => {
      render(null, container)
      document.body.removeChild(container)
      currentToast = null
    }
  })

  // 渲染toast
  render(vnode, container)
  document.body.appendChild(container)
  currentToast = vnode

  // 设置自动关闭
  setTimeout(() => {
    if (currentToast === vnode) {
      vnode.component.exposed.close()
    }
  }, duration)

  return vnode
}
