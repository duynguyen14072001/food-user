<script lang="ts" setup>
import { notify, STATUS_CODE_SUCCESS, trim } from '@/helpers'
import type { SignupDto } from '@/interface'
import { reactive } from 'vue'
import { useI18n } from 'vue3-i18n'
import { INITIAL_SIGNUP, ruleSignup } from './shared'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const authStore = useAuthStore()
const formState = reactive<SignupDto>(INITIAL_SIGNUP)
const router = useRouter()

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const onFinish = async (values: any) => {
    const { status_code, message } = await authStore.signup({ ...values })
    if (status_code !== STATUS_CODE_SUCCESS) {
        return notify(t('auth_failed'), '', 'error')
    }
    notify(message, t('signup_success'), 'success')
    router.push({ name: 'login' })
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
            :rules="ruleSignup"
            :colon="false"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item name="mail_address" :label="t('auth.signup.label.mail_address')">
                <a-input
                    v-model:value="formState.mail_address"
                    @blur="trim('mail_address', formState)"
                    :placeholder="t('mail_address')"
                />
            </a-form-item>
            <a-form-item name="name" :label="t('auth.signup.label.name')">
                <a-input
                    v-model:value="formState.name"
                    @blur="trim('name', formState)"
                    :placeholder="t('name')"
                />
            </a-form-item>
            <a-form-item name="phone_number" :label="t('auth.signup.label.phone_number')">
                <a-input
                    v-model:value="formState.phone_number"
                    @blur="trim('phone_number', formState)"
                    :placeholder="t('phone_number')"
                />
            </a-form-item>
            <a-form-item name="password" :label="t('auth.signup.label.password')">
                <a-input-password
                    v-model:value="formState.password"
                    autocomplete="on"
                    @blur="trim('password', formState)"
                    :placeholder="t('password')"
                />
            </a-form-item>
            <a-button type="primary" html-type="submit">
                {{ t('signup') }}
            </a-button>
            <router-link class="login" to="/login">
                {{ t('already_account') }}
            </router-link>
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
        .login {
            margin-top: 10px;
            display: block;
            width: 100%;
            text-align: center;
        }
    }
}
</style>
