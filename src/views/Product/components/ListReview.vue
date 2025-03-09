<script lang="ts" setup>
import {
    formatDate,
    getUser,
    INITIAL_QUERY,
    notify,
    PAGE_FIRST,
    STATUS_CODE_SUCCESS,
} from '@/helpers'
import { useReviewStore } from '@/stores'
import { reactive, ref, watch, type UnwrapRef } from 'vue'
import { FORM_REVIEW, PER_PAGE_REVIEWS, rules } from '../shared'
import { useI18n } from 'vue3-i18n'
import type { ReviewFormState } from '@/interface'
import { MinusCircleOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const props = defineProps(['productId'])
const reviewStore = useReviewStore()
const loading = ref()
const page = ref(PAGE_FIRST)
const reviews = ref([] as any)
const maxReviews = ref()
const open = ref()
const idDelete = ref()
const formState: UnwrapRef<ReviewFormState> = reactive({
    ...FORM_REVIEW,
})
const userString: string | null = getUser()
const user = userString ? JSON.parse(userString) : null
const query = ref({ ...INITIAL_QUERY, per_page: PER_PAGE_REVIEWS })

const loadMoreReview = async () => {
    loading.value = true
    page.value++
    await getReviews(page.value)
    reviewStore.getReviews.data && reviews.value.push(...reviewStore.getReviews.data)
    loading.value = false
}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const onFinish = async () => {
    loading.value = true
    const { status_code } = await reviewStore.create({ ...formState, product_id: props.productId })
    if (status_code === STATUS_CODE_SUCCESS) {
        await getReviews(PAGE_FIRST)
        page.value = PAGE_FIRST
        Object.assign(formState, FORM_REVIEW)
        notify(t('create_success'), '', 'success')
        return (loading.value = false)
    }
    loading.value = false
    return notify(t(`create_failed`), '', 'error')
}

const getReviews = async (pageCurrent: number) => {
    await reviewStore.list({
        ...query.value,
        page: pageCurrent,
        filters: [
            {
                key: 'product_id',
                data: props.productId,
            },
        ],
    })
    maxReviews.value =
        pageCurrent >=
        Math.ceil(Number(reviewStore.getReviews.total) / Number(reviewStore.getReviews.perPage))
}

const onDelete = async () => {
    loading.value = true
    open.value = false
    const { status_code } = await reviewStore.remove(idDelete.value)
    if (status_code === STATUS_CODE_SUCCESS) {
        notify(t('delete_success'), '', 'success')
        await getReviews(PAGE_FIRST)
        reviewStore.getReviews.data && (reviews.value = [...reviewStore.getReviews.data])
        page.value = PAGE_FIRST
        return (loading.value = false)
    }
    notify(t('delete_failed'), '', 'error')
    return (loading.value = false)
}

watch(
    () => props.productId,
    async () => {
        if (props.productId) {
            loading.value = true
            await getReviews(PAGE_FIRST)
            reviewStore.getReviews.data && (reviews.value = [...reviewStore.getReviews.data])
            loading.value = false
        }
    },
    { immediate: true }
)
</script>

<template>
    <div class="review-container">
        <div class="average-rating">{{ reviewStore.getReviews.averageRating }}</div>
        <a-rate :value="reviewStore.getReviews.averageRating" disabled />
        <div>{{ t('products.on_total', { 0: reviewStore.getReviews.total }) }}</div>
        <div class="rate-reviews">
            <div
                v-for="(percent, star) in reviewStore.getReviews.percentages"
                :key="star"
                class="rate-review__item"
            >
                <span>{{ star }}</span>
                <a-progress :percent="percent" />
            </div>
        </div>
    </div>
    <div v-if="user" class="form-create">
        <a-form :model="formState" :rules="rules" @finish="onFinish" @finishFailed="onFinishFailed">
            <div class="info-review">
                <div class="info-user">
                    <img :src="user.image_url" alt="" />
                </div>
                <a-form-item name="star_number">
                    <a-rate v-model:value="formState.star_number" />
                </a-form-item>
            </div>
            <a-form-item name="comment">
                <a-input v-model:value="formState.comment" />
            </a-form-item>
            <a-button html-type="submit" key="submit" type="primary">
                {{ t('products.btn_create_review') }}
            </a-button>
        </a-form>
    </div>
    <div class="box-reviews">
        <div v-for="(item, index) in reviews" :key="index" class="box-review__item">
            <div class="review-info">
                <div class="user-info">
                    <img :src="item.user.image_url" alt="" />
                    <div class="time-name">
                        <span class="name">
                            {{ item.user.name }}
                        </span>
                        <span class="time">
                            {{ formatDate(item.created_at) }}
                        </span>
                    </div>
                </div>
                <div class="review-star">
                    <a-rate :value="item.star_number" disabled />
                </div>
            </div>
            <div class="content">{{ item.comment }}</div>
            <div
                v-if="user && item.user_id === user.id"
                class="icon-delete"
                @click="open = true && (idDelete = item.id)"
            >
                <MinusCircleOutlined />
            </div>
        </div>
    </div>
    <a-button v-if="!maxReviews" @click="loadMoreReview">
        {{ t('products.btn_load_more_reviews') }}
    </a-button>
    <modal-delete :open="open" @close="open = false" @on-delete="onDelete" />
</template>

<style lang="scss" scoped>
.review-container {
    margin: 50px 0 0;
    border: 1px solid var(--vt-c-gray-5);
    border-radius: 4px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .average-rating {
        font-size: 30px;
        font-weight: bold;
    }

    .rate-reviews {
        width: 100%;

        .rate-review__item {
            display: flex;
            align-items: start;
            gap: 10px;
        }
    }
}

.box-reviews {
    margin: 50px 0 0;
    .box-review__item {
        position: relative;
        border: 1px solid var(--vt-c-gray-5);
        border-radius: 4px;
        padding: 20px;
        margin: 0 0 30px;

        .review-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .user-info {
                display: flex;
                align-items: center;
                gap: 10px;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                }

                .time-name {
                    display: flex;
                    flex-direction: column;

                    .time {
                        font-size: 12px;
                        color: var(--vt-c-gray-6);
                    }
                }
            }
        }

        .icon-delete {
            position: absolute;
            top: 5px;
            right: 24px;
            cursor: pointer;
        }
    }
}

.ant-btn-default {
    margin: 0 auto;
}

.form-create {
    margin: 50px 0 0;
    .ant-form {
        &:deep(.info-review) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 0 10px;
            .info-user {
                img {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 100%;
                }
            }

            .ant-form-item {
                margin-bottom: 0;
            }
        }

        .ant-btn-primary {
            margin: 0 0 0 auto;
        }
    }
}
</style>
