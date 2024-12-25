<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { ACCESS_TOKEN } from '@/helpers'

function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')

const baseUrl = import.meta.env.VITE_APP_API
const token = localStorage.getItem(ACCESS_TOKEN)
const headers = { authorization: `Bearer ${token}` }

const props = defineProps(['type', 'imgValue'])
const emit = defineEmits(['changeImg'])

const fileList = ref<UploadProps['fileList']>(props.imgValue)

const handleCancel = () => {
    previewVisible.value = false
    previewTitle.value = ''
}
// const handlePreview = async (file: UploadProps['fileList'][number]) => {
const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}

const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
        return
    }
    if (info.file.status === 'done') {
        emit('changeImg', fileList)
    }
    if (info.file.status === 'error') {
        message.error('upload error')
    }
}

// const beforeUpload = (file: UploadProps['fileList'][number]) => {
const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
}
</script>

<template>
    <div class="clearfix">
        <a-upload
            name="avatar"
            v-model:file-list="fileList"
            :action="`${baseUrl}/upload?type=${props.type}`"
            list-type="picture-card"
            @preview="handlePreview"
            :before-upload="beforeUpload"
            @change="handleChange"
            :headers="headers"
        >
            <div v-if="fileList && fileList.length < 8">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
            </div>
        </a-upload>
        <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: var(--vt-c-gray-6);
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: var(--vt-c-gray-v5);
}
</style>
