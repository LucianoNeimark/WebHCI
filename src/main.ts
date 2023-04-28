import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const defaultTheme = {
    dark: false,
    colors: {
        background: '4F9B8F',
        surface: '#FFFFFF',
        primary: '#2D4552',
        'primary-darken-1': '#3700B3',
        secondary: '#1A282F',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
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
