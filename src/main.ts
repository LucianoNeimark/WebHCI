import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const defaultTheme = {
    dark: false,
    colors: {
        background: '#4F9B8F',
        primary: '#2D4552', //azul navbar
        secondary:'#50AB64', //verde select
        tertiary:'#89D8CB', //verde cards
        footer: '#1a282f',
        surface_light: '#A4E3D9',
        surface: '#D7FDFF',
        lightSurface: '#FFFFFF'
    }
}

const vuetify = createVuetify({
    components,
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
