import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@/lang'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import './assets/scss/main.scss'
import 'ant-design-vue/dist/reset.css'
import 'vue3-carousel/dist/carousel.css'
import { ModalDelete, ModalVue, ProductItem } from './components/common'
import ImageSingle from './components/common/Image/ImageSingle.vue'

const app = createApp(App)

app.use(i18n)
app.use(Antd)
app.use(createPinia())
app.use(router)

app.component('modal-vue', ModalVue)
app.component('modal-delete', ModalDelete)
app.component('product-item', ProductItem)
app.component('image-single', ImageSingle)
app.mount('#app')
