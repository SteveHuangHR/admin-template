// import Vue from 'vue'
// import PageTools from './PageTools/index.vue'

// Vue.component('PageTools', PageTools)

// 通过Vue.use()注册
import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
import ImageUpload from './ImageUpload/index.vue'
export default function install(Vue) {
  Vue.component('PageTools', PageTools)
  Vue.component('UploadExcel', UploadExcel)
  Vue.component('ImageUpload', ImageUpload)
}
