<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ACCESS_TOKEN } from '@/helpers'
import { message } from 'ant-design-vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam } from 'ant-design-vue'

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

const baseUrl = import.meta.env.VITE_APP_API
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
        message.error('エラーが発生しました。')
    }
}

// const beforeUpload = (file: UploadProps['fileList'][number]) => {
const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('アップロードできるのはJPGファイルのみです。')
    }
    const isLt50M = file.size / 1024 / 1024 < 50

    if (!isLt50M) {
        message.error('画像は50MB以下のファイルのみ有効です')
    }
    return isJpgOrPng && isLt50M
}
</script>

<template>
    <a-upload
        v-model:file-list="fileList"
        name="file"
        list-type="picture-card"
        class="avatar-uploader"
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
            <div class="ant-upload-text">アップロード</div>
        </div>
    </a-upload>
</template>

<style scoped lang="scss">
.avatar-uploader {
    &:deep(> .ant-upload) {
        width: 100% !important;
        height: 100% !important;
        padding: 4px;
        border-radius: var(--vt-br-btn);
        margin-inline-end: 0 !important;
        margin-bottom: 0 !important;

        img {
            width: 100%;
        }
    }
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: var(--vt-c-gray-v6);
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: var(--vt-c-gray-v5);
}

.ant-upload-wrapper {
    &:deep(.ant-upload-select) {
        span.ant-upload {
            overflow: hidden !important;
        }
    }
}
</style>
