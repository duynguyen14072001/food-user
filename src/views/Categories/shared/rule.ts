import i18n from '@/lang'
import { MAX_STRING } from '@/helpers'
const { t } = i18n

export const ruleCategory = {
    name: [
        {
            required: true,
            message: t('validation.required', [t('categories.modal.name')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', [t('categories.modal.name'), MAX_STRING]),
        },
    ],
}
