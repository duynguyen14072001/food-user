<script lang="ts" setup>
import type { UserCreateDto } from '@/interface'
import { useAuthStore } from '@/stores'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { FORM_PROFILE, rules } from './shared'

const { t } = useI18n()
const authStore = useAuthStore()
const loading = ref()
const formState = reactive<UserCreateDto>({
    ...FORM_PROFILE,
})

const handleImg = (e: any) => (formState.image_url = e.value.at(-1).response.result)

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const onFinish = async () => {
    loading.value = true
    await authStore.updateInfo(formState)
    loading.value = false
}

onMounted(async () => {
    loading.value = true
    await authStore.getMe()
    Object.assign(formState, authStore.getUser)
    loading.value = false
})
</script>

<template>
    <h1>{{ t('profile.title') }}</h1>
    <div class="full-page">
        <a-spin tip="Loading..." :spinning="loading">
            <a-form
                @finish="onFinish"
                @finishFailed="onFinishFailed"
                :model="formState"
                :rules="rules"
            >
                <a-form-item name="image_url" :label="t('profile.form.label.image')">
                    <image-single
                        type="avatars"
                        :img-value="formState.image_url"
                        @change-img="handleImg"
                    />
                </a-form-item>
                <a-form-item name="mail_address" :label="t('profile.form.label.mail_address')">
                    <a-input v-model:value="formState.mail_address" disabled></a-input>
                </a-form-item>
                <a-form-item name="name" :label="t('profile.form.label.name')">
                    <a-input v-model:value="formState.name"></a-input>
                </a-form-item>
                <a-form-item name="phone_number" :label="t('profile.form.label.phone_number')">
                    <a-input v-model:value="formState.phone_number"></a-input>
                </a-form-item>
                <a-form-item name="old_password" :label="t('profile.form.label.old_password')">
                    <a-input-password v-model:value="formState.old_password"></a-input-password>
                </a-form-item>
                <a-form-item name="new_password" :label="t('profile.form.label.new_password')">
                    <a-input-password v-model:value="formState.new_password"></a-input-password>
                </a-form-item>
                <a-button html-type="submit" key="submit" type="primary">
                    {{ t('profile.form.btn_sbm') }}
                </a-button>
            </a-form>
        </a-spin>
    </div>
</template>

<style lang="scss" scoped>
.full-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--vt-c-gray-5);
    border-radius: 4px;
    min-height: calc(100vh - 184px);
}
</style>
