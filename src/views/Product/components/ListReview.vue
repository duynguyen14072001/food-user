<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import { useReviewStore } from '@/stores'
import { onMounted, ref } from 'vue'

const props = defineProps(['productId'])
const reviewStore = useReviewStore()
const loading = ref()
const query = ref(INITIAL_QUERY)

onMounted(async () => {
    loading.value = true
    await reviewStore.list({
        ...query.value,
        filters: [
            {
                key: 'product_id',
                data: props.productId,
            },
        ],
    })
    loading.value = false
})
</script>

<template>
    <div class="box-reviews"></div>
</template>

<style lang="scss" scoped></style>
