<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import * as Imgs from '@/assets/imgs'
import { useAuthStore } from '@/stores/auth'
import type { ForgotPasswordDto } from '@/interface'
import { notify, STATUS_CODE_SUCCESS } from '@/helpers'
import { INITIAL_FORGOT_PASSWORD, ruleForm } from './shared'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const formState = reactive<ForgotPasswordDto>(INITIAL_FORGOT_PASSWORD)

const onFinish = async (values: any) => {
    loading.value = true
    const { status_code, message } = await authStore.forgotPassword({ ...values })
    loading.value = false
    if (status_code !== STATUS_CODE_SUCCESS) {
        return notify(message[0].error[0], '', 'error')
    }

    notify(message, t('auth.notify.sent'), 'success')
    router.push({ name: 'login' })
}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const trim = (field: 'mail_address') => {
    if (formState[field]) {
        formState[field] = formState[field].trim()
    }
}
</script>

<template>
    <section className="full-page auth-password">
        <div className="content">
            <h4 className="form-title">{{ t('auth.forgot_password.title') }}</h4>
            <a-form
                name="basic"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                autocomplete="off"
                :model="formState"
                :colon="false"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    name="mail_address"
                    :label="t('auth.forgot_password.label.mail_address')"
                    :rules="ruleForm.mail_address"
                >
                    <a-input
                        v-model:value="formState.mail_address"
                        :placeholder="t('mail_address')"
                        @blur="trim('mail_address')"
                    />
                </a-form-item>

                <div class="box-button">
                    <a class="a-redirect" href="/login">
                        <img :src="Imgs.IconArrowRight2" alt="" />
                        {{ t('login') }}
                    </a>
                    <a-button type="primary" html-type="submit" :loading="loading">
                        {{ t('auth.forgot_password.btn_sbm') }}
                    </a-button>
                </div>
            </a-form>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/__auth.scss';
</style>
