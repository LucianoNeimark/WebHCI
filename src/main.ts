import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from '@/App.vue'
import {defaultTheme} from "@/themes";
import router from '@/router'
import locale from '@/locales/es'

import './assets/main.css'
import {VDataTableServer} from "vuetify/labs/VDataTable";
import { createI18n, useI18n }  from 'vue-i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

//import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const i18n = new createI18n({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
        es: locale
    }
})

const vuetify = createVuetify({
    components: {
        ...components,
        VDataTableServer
    },
    directives,
    theme: {
        defaultTheme: 'defaultTheme',
        themes: {
            defaultTheme
        }
    },
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    }
})

const app = createApp(App).use(vuetify)

app.use(createPinia())
//app.use(ToastPlugin, { position: 'top-right' })
app.use(router)
app.use(i18n)
app.mount('#app')
