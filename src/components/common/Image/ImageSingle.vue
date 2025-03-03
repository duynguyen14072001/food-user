<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ACCESS_TOKEN } from '@/helpers'
import { message } from 'ant-design-vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam } from 'ant-design-vue'
import { useI18n } from 'vue3-i18n'

const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

const baseUrl = import.meta.env.VITE_APP_API
const { t } = useI18n()
const token = localStorage.getItem(ACCESS_TOKEN)
const headers = { authorization: `Bearer ${token}` }

const fileList = ref([])
const loading = ref<boolean>(false)

const props = defineProps(['type', 'imgValue'])

const imageUrl = ref<string>(props.imgValue ?? '')
const emit = defineEmits(['changeImg'])

watch(
    () => props.imgValue,
    () => {
        imageUrl.value = props.imgValue
        loading.value = false
    }
)

const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
        loading.value = true
        return
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as any, (base64Url: string) => {
            imageUrl.value = base64Url
            loading.value = false
        })
        emit('changeImg', fileList)
    }
    if (info.file.status === 'error') {
        loading.value = false
        message.error(t('error'))
    }
}

// const beforeUpload = (file: UploadProps['fileList'][number]) => {
const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error(t('file.required_jpg_or_png'))
    }
    const isLt50M = file.size / 1024 / 1024 < 50

    if (!isLt50M) {
        message.error(t('file.image_max_size'))
    }
    return isJpgOrPng && isLt50M
}
</script>

<template>
    <a-upload
        v-model:file-list="fileList"
        name="file"
        list-type="picture-card"
        class="uploader"
        :show-upload-list="false"
        :action="`${baseUrl}/uploads?type=${props.type}`"
        :before-upload="beforeUpload"
        :headers="headers"
        @change="handleChange"
    >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else class="input-text">
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">{{ t('upload') }}</div>
        </div>
    </a-upload>
</template>

<style scoped lang="scss">
.uploader {
    &:deep(.ant-upload-select-picture-card) {
        border-radius: 100% !important;
    }
    &:deep(.ant-upload) {
        padding: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px !important;
        height: 90px !important;
    }
}
</style>
