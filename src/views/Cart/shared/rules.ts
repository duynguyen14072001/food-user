import { MAX_STRING } from '@/helpers'
import i18n from '@/lang'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const rules: Record<string, Rule[]> = {
    shipping_address: [
        {
            required: true,
            message: t('validation.required', [t('cart.form.label.shipping_address')]),
        },
        {
            type: 'string',
            message: t('validation.string', {
                0: t('cart.form.label.shipping_address'),
            }),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('cart.form.label.shipping_address'),
                1: MAX_STRING,
            }),
        },
    ],
    payment_method: [
        {
            required: true,
            message: t('validation.required', [t('cart.form.label.payment_method')]),
        },
    ],
}
