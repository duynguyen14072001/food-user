import i18n from '@/lang'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const rules: Record<string, Rule[]> = {
    star_number: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.star_number')]),
        },
        {
            validator: (_, value) => {
                if (value > 0) {
                    return Promise.resolve()
                }
                return Promise.reject(
                    new Error(t('validation.min_value', [t('products.form.label.star_number'), 0]))
                )
            },
        },
    ],
    comment: [
        {
            required: true,
            message: t('validation.required', [t('products.form.label.comment')]),
        },
    ],
}
