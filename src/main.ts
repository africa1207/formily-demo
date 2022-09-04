import { createApp } from 'vue'
import VueForm from '@lljj/vue3-form-element';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import '@smallwei/avue/lib/index.css';

import 'v-calendar/dist/style.css';
// @ts-ignore
import { SetupCalendar } from 'v-calendar';

import Vue3ProTable from "vue3-pro-table";

const app = createApp(App)

app.component('VueForm', VueForm)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(SetupCalendar,{})
app.use(Vue3ProTable);


app.mount('#app')
