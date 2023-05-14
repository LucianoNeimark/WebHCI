import type { ToastPluginApi } from 'vue-toast-notification'
import { errorMessages } from '@/utils/constants'

export const isAlphaNumeric = (expression : string) => {
    return /^[a-zA-Z0-9_ ]*$/.test(expression)
}
export const isValidLength = (expression : string) => {
    return expression.length <= 60
}

export const isColor = (expression : string) => {
    return /^[0-9A-F]{6}$/i.test(expression)
}

export const displayErrorMsg = ($toast: ToastPluginApi, msg: string, code?: 1 | 2 | 3 | 4) => {
    if (code) $toast.error(`${msg}: ${errorMessages[code]}`, { position: 'top-right' })
    else $toast.error(msg, { position: 'top-right', duration: 5000 })
}