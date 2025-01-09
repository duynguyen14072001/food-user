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
    <section className="full-page auth-password">
        <div className="content">
            <h4 className="form-title">{{ t('auth.reset_password.title') }}</h4>
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
                <a-form-item
                    name="new_password"
                    :label="t('auth.reset_password.label.new_password')"
                >
                    <a-input-password
                        v-model:value="formState.new_password"
                        @blur="trim('new_password')"
                        :placeholder="t('password')"
                    />
                </a-form-item>

                <a-form-item
                    name="conf_password"
                    :label="t('auth.reset_password.label.conf_password')"
                >
                    <a-input-password
                        v-model:value="formState.conf_password"
                        @blur="trim('conf_password')"
                        :placeholder="t('password')"
                    />
                </a-form-item>
                <div class="box-button">
                    <a class="a-redirect" href="/login">
                        <img :src="Imgs.IconArrowRight2" alt="" />
                        {{ t('login') }}
                    </a>
                    <a-button type="primary" html-type="submit" :loading="loading">
                        {{ t('auth.reset_password.btn_sbm') }}
                    </a-button>
                </div>
            </a-form>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>
