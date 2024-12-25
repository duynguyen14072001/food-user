<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import { useCategoryStore } from '@/stores/category'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'
import ModalCategory from './components/ModalCategory.vue'

const categoriesStore = useCategoryStore()
const { t } = useI18n()
const query = ref(INITIAL_QUERY)
const loading = ref(false)
const open = ref()
const id = ref()

const handleCreate = () => {
    id.value = null
    open.value = true
}

const cellClick = (e: Record<string, any>, b: Record<string, any>) => {
    open.value = true
    id.value = b.id
}

onMounted(async () => {
    loading.value = true
    await categoriesStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <section>
        <div class="title">
            <h1>{{ t('categories.title') }}</h1>
            <a-button @click="handleCreate">{{ t('button.create') }}</a-button>
        </div>
        <table-data
            :data="categoriesStore.getCategories"
            :columns="columns"
            :loading="loading"
            :hasCreate="false"
            :showSelection="false"
            @cellClick="cellClick"
        />
    </section>

    <ModalCategory :open="open" :id="id" @close="open = false" />
</template>

<style lang="scss" scoped></style>
