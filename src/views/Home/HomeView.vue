<script setup lang="ts">
import { PAYLOAD_ALL } from '@/helpers'
import { useBannerStore, useFaqStore, useProductStore, useRecommendStore } from '@/stores'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'

const bannerStore = useBannerStore()
const recommendStore = useRecommendStore()
const faqStore = useFaqStore()
const loading = ref()
const { t } = useI18n()

onMounted(async () => {
    loading.value = true
    await nextTick()
    Promise.all([
        bannerStore.list({ ...PAYLOAD_ALL, orders: [{ key: 'number', dir: 'asc' }] }),
        recommendStore.list({ ...PAYLOAD_ALL, orders: [{ key: 'number', dir: 'asc' }] }),
        faqStore.list({ ...PAYLOAD_ALL, orders: [{ key: 'number', dir: 'asc' }] }),
    ])
    loading.value = false
})
</script>

<template>
    <div class="banners">
        <a-carousel arrows :dots="false" :autoplay="true">
            <template #prevArrow>
                <div class="custom-slick-arrow">
                    <LeftOutlined style="font-size: 30px; color: red" />
                </div>
            </template>
            <template #nextArrow>
                <div class="custom-slick-arrow">
                    <RightOutlined style="font-size: 30px; color: red" />
                </div>
            </template>
            <div class="banner-item" v-for="item in bannerStore.getBanners.data">
                <img :src="item.image_url" alt="" loading="lazy" />
            </div>
        </a-carousel>
    </div>

    <div class="recommends">
        <h1 class="title">
            {{ t('home.recommend.title') }}
        </h1>
        <div class="content">
            <product-item
                v-for="(item, index) in recommendStore.getRecommends.data"
                :item="item.product"
                :key="index"
            />
        </div>
    </div>

    <div class="faqs">
        <h1 class="title">
            {{ t('home.faq.title') }}
        </h1>
        <a-collapse expand-icon-position="end">
            <a-collapse-panel
                v-for="(item, index) in faqStore.getFaqs.data"
                :key="index"
                :header="item.question"
            >
                <p>{{ item.answer }}</p>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<style lang="scss" scoped>
.ant-carousel {
    &:deep(.slick-slider) {
        .custom-slick-arrow {
            z-index: 10;
            margin-top: 0;
        }
        .slick-prev {
            left: 5px;
        }

        .slick-next {
            right: 5px;
        }
        .banner-item {
            height: 500px;
            img {
                width: 100%;
            }
        }
    }
}

.recommends {
    margin-top: 80px;
    .title {
        margin-bottom: 30px;
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
}

.faqs {
    margin-top: 80px;
    .title {
        margin-bottom: 30px;
    }

    .ant-collapse {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: none;
        background-color: unset;

        &:deep(.ant-collapse-item) {
            border-bottom: none;
            background-color: unset;
            border: 1px solid var(--vt-c-gray-5);
            border-radius: 8px;

            .ant-collapse-header {
                padding: 20px 40px;
                font-size: 18px;
                align-items: center;

                .ant-collapse-expand-icon{
                    .anticon{
                        font-size: 20px;
                    }
                }
            }

            .ant-collapse-content {
                border-top: none;
                border-radius: 0 0 8px 8px;
                background-color: var(--vt-c-gray-v6);
                font-size: 16px;

                .ant-collapse-content-box{
                    padding: 20px 40px 40px;
                }
            }
        }
    }
}
</style>
