import { MAX_STRING, validateInteger } from '@/helpers'
import i18n from '@/lang'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const rules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: t('validation.required', [t('profile.form.label.name')]),
        },
        {
            type: 'string',
            message: t('validation.string', {
                0: t('profile.form.label.name'),
            }),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('profile.form.label.name'),
                1: MAX_STRING,
            }),
        },
    ],
    phone_number: [
        {
            required: true,
            message: t('validation.required', [t('profile.form.label.phone_number')]),
        },
    ],
}
