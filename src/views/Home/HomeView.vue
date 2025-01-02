<script setup lang="ts">
import { PAYLOAD_ALL } from '@/helpers';
import { useProductStore } from '@/stores';
import { onMounted, ref } from 'vue';

const productStore = useProductStore()
const loading = ref()

onMounted(async()=>{
    loading.value = true
    await productStore.list(PAYLOAD_ALL)
    loading.value = false
})
</script>

<template>
    <div class="container">
        <div class="product-item" v-for="item in productStore.getProduct.data">
            <img :src="item.image_url" alt="">
            <div>{{ item.name }}</div>
            <div>{{ item.price }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    display: grid;
    grid-template-columns: repeat(4, 1fr);;
    gap: 20px;
    .product-item{
        img{
            width: 100%;
            height: auto;
        }
    }
}
</style>
