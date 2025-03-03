<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import * as Imgs from '@/assets/imgs'
import { useAuthStore } from '@/stores/auth'
import type { ResetPasswordDto } from '@/interface'
import { notify, STATUS_CODE_SUCCESS } from '@/helpers'
import { getChangePasswordRule, INITIAL_RESET_PASSWORD } from './shared'

const { t } = useI18n()
const router = useRouter()
const { query } = useRoute()
const authStore = useAuthStore()
const loading = ref(false)
const formState = reactive<ResetPasswordDto>(INITIAL_RESET_PASSWORD)

const onFinish = async (values: any) => {
    loading.value = true
    const { status_code, message } = await authStore.resetPassword({
        ...values,
        ...query,
    })
    loading.value = false
    if (status_code !== STATUS_CODE_SUCCESS) {
        return notify(t('error'), '', 'error')
    }

    notify(message, t('auth.notify.changed_password'), 'success')
    router.push({ name: 'login' })
}

const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo)
}

const trim = (field: 'new_password' | 'conf_password') => {
    if (formState[field]) {
        formState[field] = formState[field].trim()
    }
}
</script>

<template>
    <section className="form-reset">
        <div className="content">
            <h4 className="form-title">{{ t('auth.reset_pass.title') }}</h4>
            <a-form
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                :model="formState"
                :rules="getChangePasswordRule(formState)"
                :colon="false"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item name="new_password" :label="t('auth.reset_pass.label.new_password')">
                    <a-input-password
                        v-model:value="formState.new_password"
                        @blur="trim('new_password')"
                        :placeholder="t('password')"
                    />
                </a-form-item>

                <a-form-item name="conf_password" :label="t('auth.reset_pass.label.conf_password')">
                    <a-input-password
                        v-model:value="formState.conf_password"
                        @blur="trim('conf_password')"
                        :placeholder="t('password')"
                    />
                </a-form-item>
                <div class="box-button">
                    <router-link class="a-redirect" to="/login">
                        {{ t('auth.reset_pass.back_login') }}
                    </router-link>
                    <a-button type="primary" html-type="submit" :loading="loading">
                        {{ t('auth.reset_pass.btn_sbm') }}
                    </a-button>
                </div>
            </a-form>
        </div>
    </section>
</template>

<style scoped lang="scss">
.form-reset {
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
        &:deep(.ant-form-item) {
            .ant-row {
                .ant-col {
                    text-align: left;
                }
            }
        }
        .box-button {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>
