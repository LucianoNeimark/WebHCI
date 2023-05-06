import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import {defaultTheme} from "@/themes";
import router from './router'

import './assets/main.css'
import {VDataTableServer} from "vuetify/labs/VDataTable";

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
    }
})

const app = createApp(App).use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
