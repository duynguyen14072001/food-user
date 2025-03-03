<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import * as Imgs from '@/assets/imgs'
import { useAuthStore } from '@/stores/auth'
import type { ForgotPasswordDto } from '@/interface'
import { notify, STATUS_CODE_FORBIDDEN, STATUS_CODE_SUCCESS } from '@/helpers'
import { INITIAL_FORGOT_PASSWORD, ruleFormForgotPassword } from './shared'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const formState = reactive<ForgotPasswordDto>(INITIAL_FORGOT_PASSWORD)

const onFinish = async (values: any) => {
    loading.value = true
    const { status_code } = await authStore.forgotPassword({ ...values })
    loading.value = false
    if (status_code === STATUS_CODE_SUCCESS) {
        notify(t('auth.forgot_pass.success'), '', 'success')
        return router.push({ name: 'login' })
    }

    if (status_code === STATUS_CODE_FORBIDDEN) {
        return notify(t('auth.forgot_pass.forbidden'), '', 'error')
    }

    return notify(t('auth.forgot_pass.failed'), '', 'error')
}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const trim = (field: 'mail_address') => {
    if (formState[field]) {
        formState[field] = formState[field].trim()
    }
}
</script>

<template>
    <section class="form-forgot">
        <div class="content">
            <h4 class="form-title">{{ t('auth.forgot_password.title') }}</h4>
            <a-form
                name="basic"
                autocomplete="off"
                :model="formState"
                :colon="false"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item name="mail_address" :rules="ruleFormForgotPassword.mail_address">
                    <a-input
                        v-model:value="formState.mail_address"
                        :placeholder="t('mail_address')"
                        @blur="trim('mail_address')"
                    />
                </a-form-item>

                <div class="box-button">
                    <router-link to="/login">
                        {{ t('auth.forgot_pass.back_login') }}
                    </router-link>
                    <a-button type="primary" html-type="submit" :loading="loading">
                        {{ t('auth.forgot_pass.btn_sbm') }}
                    </a-button>
                </div>
            </a-form>
        </div>
    </section>
</template>

<style scoped lang="scss">
.form-forgot {
    max-width: 600px;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 65px 34px;
    background-color: var(--vt-c-white);
    box-shadow: 0 0 4px #adadad66;

    .ant-form {
        .box-button {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>
