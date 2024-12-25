<script lang="ts" setup>
import { notify, STATUS_CODE_SUCCESS, trim } from '@/helpers'
import type { LoginDto } from '@/interface'
import { reactive } from 'vue'
import { useI18n } from 'vue3-i18n'
import { INITIAL_LOGIN, ruleLogin } from './shared'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const authStore = useAuthStore()
const formState = reactive<LoginDto>(INITIAL_LOGIN)
const router = useRouter()

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const onFinish = async (values: any) => {
    const { status_code, message } = await authStore.login({ ...values })
    if (status_code !== STATUS_CODE_SUCCESS) {
        return notify(t('auth_failed'), '', 'error')
    }
    notify(message, t('login_success'), 'success')
    router.push({ name: 'products-list' })
}
</script>

<template>
    <section className="form-login">
        <a-form
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            ref="ruleFormRef"
            :model="formState"
            :rules="ruleLogin"
            :colon="false"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item name="mail_address" :label="t('auth.login.label.mail_address')">
                <a-input
                    v-model:value="formState.mail_address"
                    @blur="trim('mail_address', formState)"
                    :placeholder="t('mail_address')"
                />
            </a-form-item>

            <a-form-item name="password" :label="t('auth.login.label.password')">
                <a-input-password
                    v-model:value="formState.password"
                    autocomplete="on"
                    @blur="trim('password', formState)"
                    :placeholder="t('password')"
                />
            </a-form-item>
            <a-button type="primary" html-type="submit">
                {{ t('login') }}
            </a-button>
            <a class="forgot-password" href="/forgot-password">
                {{ t('forgot_password') }}
            </a>
        </a-form>
    </section>
</template>

<style lang="scss" scoped>
.form-login {
    max-width: 470px;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 65px 34px;
    background-color: var(--vt-c-white);
    box-shadow: 0 0 4px #adadad66;

    .ant-form {
        .ant-form-item {
            &:deep(.ant-row) {
                .ant-col {
                    text-align: left;
                }
            }
        }
        .ant-btn {
            width: 100%;
        }
        .forgot-password {
            margin-top: 10px;
            display: block;
            width: 100%;
            text-align: center;
        }
    }
}
</style>
