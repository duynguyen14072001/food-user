import { createI18n } from 'vue3-i18n'
import { en } from './en'
import { vi } from './vi'

const messages = {
    en: en,
    vi: vi,
}

const i18n = createI18n({
    locale: 'vi',
    fallbackLocale: 'vi',
    messages,
} as any)

export default i18n
