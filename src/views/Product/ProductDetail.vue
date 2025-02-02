<script lang="ts" setup>
import { STATUS_CODE_SUCCESS } from '@/helpers'
import { useProductStore } from '@/stores'
import { onMounted, reactive, ref, type UnwrapRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

const { params } = useRoute()
const router = useRouter()
const productStore = useProductStore()
const data = ref()
const listImage = ref([] as any)
const currentIndex = ref(1)
const mainImage = ref()
const formState: UnwrapRef<any> = reactive({
    quantity: 1,
})

const goToSlide = (image: string) => (mainImage.value = image)

onMounted(async () => {
    const product = await productStore.detail(params.slug as string)
    const { status_code } = product
    if (status_code === STATUS_CODE_SUCCESS) {
        data.value = product
        mainImage.value = data.value.image_url
        listImage.value = [data.value.image_url, ...data.value.image_urls]
        return true
    }
    router.push({ name: 'page-not-found' })
})
</script>

<template>
    <div class="container">
        <div class="banner">
            <img class="main-image" :src="mainImage" alt="" />
            <Carousel v-if="listImage.length" :items-to-show="4" v-model="currentIndex">
                <Slide v-for="(item, index) in listImage" :key="index" @click="goToSlide(item)">
                    <img :src="item" class="carousel-image" />
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>

        <div class="info">
            <div class="name">{{ productStore.getProductDetail.name }}</div>
            <div class="price">{{ productStore.getProductDetail.price }} VND</div>
            <div class="description">{{ productStore.getProductDetail.description }}</div>
            <a-input-number :min="1" :max="100000" v-model:value="formState.quantity" />
            <div class="btn-group">
                <a-button>Thêm vào giỏ hàng</a-button>
                <a-button type="primary">Mua ngay</a-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    .banner {
        width: 400px;
        .main-image {
            height: 400px;
            margin-bottom: 20px;
        }
        &:deep(.carousel) {
            .carousel__track {
                gap: 20px;
                display: grid;
                grid-template-columns: repeat(4, 1fr);

                .carousel__slide {
                    width: 100% !important;
                }
            }

            .carousel__prev {
                margin: 0;
            }
        }
    }

    .info {
    }
}
.carousel-image {
    cursor: pointer;
}
</style>
