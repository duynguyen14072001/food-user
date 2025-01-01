<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import * as Imgs from '@/assets/imgs'

const { t } = useI18n()
const props = defineProps(['open', 'loading'])
</script>

<template>
    <modal-vue
        :open="props.open"
        :wrapClassName="'modal-delete-chapter'"
        :centered="true"
        :width="433"
        :hasFooter="false"
        :closable="false"
        @cancel="$emit('close')"
    >
        <template #body>
            <h4 class="title-modal">{{ t('modal.delete.title') }}</h4>
            <div class="content">{{ t('modal.delete.content') }}</div>
            <a-space>
                <a-button type="link" @click="$emit('close')">
                    {{ t('button.cancel') }}
                </a-button>
                <a-button class="sbm" :loading="props.loading" @click="$emit('onDelete')">
                    <img :src="Imgs.IconTrash" alt="" /> {{ t('modal.btn_delete') }}
                </a-button>
            </a-space>
        </template>
    </modal-vue>
</template>

<style scoped lang="scss">
.title-modal {
    text-align: center;
    margin-bottom: 10px;
}

.content {
    text-align: center;
}

.ant-space {
    width: 100%;
    display: flex;
    margin-top: 15px;
    justify-content: end;
}
</style>
