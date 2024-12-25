<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import * as Imgs from '@/assets/imgs'
import { useAuthStore } from '@/stores/auth'
import type { ChangePasswordDto } from '@/interface'
import { notify, STATUS_CODE_SUCCESS } from '@/helpers'
import { getChangePasswordRule, INITIAL_CHANGE_PASSWORD } from './shared'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const formRef = ref()
const formState = reactive<ChangePasswordDto>(INITIAL_CHANGE_PASSWORD)

const onFinish = async (values: any) => {
    const { status_code, message } = await authStore.changePassword({ ...values })
    if (status_code !== STATUS_CODE_SUCCESS) {
        return notify(t('invalid'), '', 'error')
    }

    notify(message, t('success'), 'success')
    router.push({ name: 'manga-list' })
}

const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo)
}

const trim = (field: 'old_password' | 'new_password' | 'conf_password') => {
    if (formState[field]) {
        formState[field] = formState[field].trim()
    }
}

const resetForm = () => {
    formRef.value.resetFields()
    window.history.back()
}
</script>

<template>
    <section className="full-page auth-password">
        <div className="content">
            <h4 className="form-title">{{ t('auth.change_password.title') }}</h4>
            <a-form
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                ref="formRef"
                :model="formState"
                :rules="getChangePasswordRule(formState)"
                :colon="false"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    name="old_password"
                    :label="t('auth.change_password.label.old_password')"
                >
                    <a-input-password
                        v-model:value="formState.old_password"
                        @blur="trim('old_password')"
                        :placeholder="t('password')"
                    />
                </a-form-item>

                <div class="line" />
                <a-form-item
                    name="new_password"
                    :label="t('auth.change_password.label.new_password')"
                >
                    <a-input-password
                        v-model:value="formState.new_password"
                        @blur="trim('new_password')"
                        :placeholder="t('password')"
                    />
                </a-form-item>

                <a-form-item
                    name="conf_password"
                    :label="t('auth.change_password.label.conf_password')"
                >
                    <a-input-password
                        v-model:value="formState.conf_password"
                        @blur="trim('conf_password')"
                        :placeholder="t('password')"
                    />
                </a-form-item>
                <div class="box-button">
                    <a-button class="a-redirect" type="link" @click="resetForm">
                        <img :src="Imgs.IconArrowRight2" alt="" />
                        {{ t('cancel') }}
                    </a-button>
                    <a-button type="primary" html-type="submit">
                        {{ t('save') }}
                    </a-button>
                </div>
            </a-form>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/__auth.scss';
</style>
