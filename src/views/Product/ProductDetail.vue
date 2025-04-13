<script lang="ts" setup>
import { notify, STATUS_CODE_SUCCESS } from '@/helpers'
import { useCartStore, useProductStore } from '@/stores'
import { onMounted, reactive, ref, type UnwrapRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Carousel, Slide } from 'vue3-carousel'
import { useI18n } from 'vue3-i18n'
import ListReview from './components/ListReview.vue'

const { params } = useRoute()
const router = useRouter()
const { t } = useI18n()
const productStore = useProductStore()
const data = ref()
const listImage = ref([] as any)
const currentIndex = ref(1)
const mainImage = ref()
const cartStore = useCartStore()
const loading = ref()
const formState: UnwrapRef<any> = reactive({
    quantity: 1,
})

const goToSlide = (image: string) => (mainImage.value = image)

const handleAddCart = async () => {
    loading.value = true
    const { status_code } = await cartStore.upsert({
        product_id: productStore.getProductDetail.id,
        quantity: formState.quantity,
    })
    formState.quantity = 1
    if (status_code === STATUS_CODE_SUCCESS) {
        notify(t('products.add_cart_success'), '', 'success')
    }
    loading.value = false
}

onMounted(async () => {
    loading.value = true
    const product = await productStore.detail(params.slug as string)
    const { status_code } = product
    if (status_code === STATUS_CODE_SUCCESS) {
        data.value = product
        mainImage.value = data.value.image_url
        listImage.value = [data.value.image_url, ...data.value.image_urls]
        loading.value = false
        return true
    }
    router.push({ name: 'page-not-found' })
})
</script>

<template>
    <a-spin tip="Loading..." :spinning="loading">
        <div class="container">
            <div class="banner">
                <img class="main-image" :src="mainImage" alt="" />
                <Carousel
                    v-if="listImage.length"
                    :items-to-show="4"
                    v-model="currentIndex"
                    :snap-align="'start'"
                    :wrap-around="false"
                >
                    <Slide v-for="(item, index) in listImage" :key="index" @click="goToSlide(item)">
                        <img :src="item" class="carousel-image" />
                    </Slide>
                    <template #addons> </template>
                </Carousel>
            </div>

            <div class="info">
                <div class="name">{{ productStore.getProductDetail.name }}</div>
                <div class="category">
                    <div
                        class="category__item"
                        v-for="(item, index) in productStore.getProductDetail.category_names"
                        :key="index"
                    >
                        {{ item }}
                    </div>
                </div>
                <div class="price">
                    {{ productStore.getProductDetail.price }} {{ t('unit_price') }}
                </div>
                <a-input-number
                    class="quantity"
                    :min="1"
                    :max="100000"
                    v-model:value="formState.quantity"
                />
                <div class="btn-group">
                    <a-button @click="handleAddCart">{{ t('products.btn_cart') }}</a-button>
                </div>
            </div>
        </div>

        <div class="description">{{ productStore.getProductDetail.description }}</div>

        <ListReview :product-id="productStore.getProductDetail.id" />
    </a-spin>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    gap: 40px;
    .banner {
        width: 400px;
        .main-image {
            height: 400px;
            margin-bottom: 20px;
        }

        &:deep(.carousel) {
            .carousel__track {
                gap: 20px;
                .carousel__slide {
                    width: calc((100% - 60px) / 4) !important;
                }
            }
        }
    }

    .info {
        width: 50%;

        .name {
            font-size: 40px;
            font-weight: bold;
        }

        .category {
            display: flex;
            margin: 0 0 20px;
            flex-wrap: wrap;
            gap: 10px;
            color: var(--vt-c-gray-1);

            &__item {
                border: 1px solid;
                border-radius: 4px;
                padding: 2px 4px;
            }
        }

        .price,
        .quantity {
            margin: 0 0 20px;
        }
    }
}
.carousel-image {
    cursor: pointer;
}
</style>
