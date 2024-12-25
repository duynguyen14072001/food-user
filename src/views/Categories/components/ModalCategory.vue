<script lang="ts" setup>
import { notify, STATUS_CODE_SUCCESS, trim } from '@/helpers'
import type { FormStateCategory } from '@/interface'
import { onMounted, reactive, ref, watch, type UnwrapRef } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useCategoryStore } from '@/stores/category'
import { FORM_CATEGORY, ruleCategory } from '../shared'
import * as Imgs from '@/assets/imgs'

const { t } = useI18n()
const props = defineProps(['open', 'loading', 'id'])
const emit = defineEmits(['close'])
const formRef = ref()

const formState: UnwrapRef<FormStateCategory> = reactive({
    ...FORM_CATEGORY,
})
const categoriesStore = useCategoryStore()
const openDelete = ref()

const handleSubmit = async () => {
    await formRef.value
        .validate()
        .then(async () => {
            const { status_code } = !props.id
                ? await categoriesStore.create(formState)
                : await categoriesStore.update(formState, props.id)
            if (status_code !== STATUS_CODE_SUCCESS) {
                return notify(t(`${!props.id ? 'create' : 'update'}_failed`), '', 'error')
            }
            emit('close')
            notify(t(`${!props.id ? 'create' : 'update'}_success`), '', 'success')
            formRef.value.resetFields()
        })
        .catch((error: any) => {
            console.log('error', error)
        })
}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const getData = async (id: number) => {
    await categoriesStore.detail(id)
    console.log('1 :>> ', 1);
    if (!categoriesStore.getCategoryDetail) {
        formState.name = ''
        return
    }
    formState.name = categoriesStore.getCategoryDetail.name
}

const onDelete = async ()=>{
    const { status_code } = await categoriesStore.remove(props.id)
    openDelete.value = false
    emit('close')
    status_code === STATUS_CODE_SUCCESS ? notify(t('delete_success'),'','success') : notify(t('delete_failed'),'','error')
}

watch(
    () => props.id,
    async () => {
        !props.id && formRef.value.resetFields()
        props.id && (await getData(props.id))
    }
)

onMounted(async () => props.id && (await getData(props.id)))
</script>

<template>
    <modal-vue
        :open="props.open"
        :wrapClassName="'modal-category'"
        :centered="true"
        :width="433"
        :hasFooter="false"
        :closable="true"
        @cancel="$emit('close')"
    >
        <template #body>
            <a-form
                ref="formRef"
                :model="formState"
                :rules="ruleCategory"
                :colon="false"
                @finish="handleSubmit"
                @finishFailed="onFinishFailed"
            >
                <a-form-item name="name" :label="t('categories.modal.name')">
                    <a-input v-model:value="formState.name" @blur="trim('name', formState)" />
                </a-form-item>
                <div class="btn-group">
                <div class="button-direction">
                    <a-button html-type="submit" key="submit" type="primary">
                        {{ t('button.submit') }}
                    </a-button>
                    <a-button key="back" @click="$emit('close')">
                        {{ t('button.cancel') }}
                    </a-button>
                </div>
                <a-button class="sbm" v-if="props.id" @click="openDelete = true">
                    <img :src="Imgs.IconTrash" alt="" /> {{ t('chapter.modal.btn_delete') }}
                </a-button>
            </div>
            </a-form>
        </template>
    </modal-vue>

    <modal-delete :open="openDelete" @close="openDelete = false" @on-delete="onDelete" />
</template>

<style lang="scss" scoped>
.btn-group{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
</style>
