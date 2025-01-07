<script setup lang="ts">
import { GithubFilled, LinkedinFilled, MessageFilled } from '@ant-design/icons-vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
</script>

<template>
    <footer>
        <div class="title">{{ t('footer.name') }}</div>
        <div class="content">
            <div class="item">
                <span class="item-title">{{ t('footer.contact_us') }}</span>
                <div class="item-content">
                    <div class="gmail">
                        <MessageFilled />
                        <span>duy.nguyeanh01@gmail.com</span>
                    </div>
                </div>
            </div>
            <div class="item">
                <span class="item-title">{{ t('footer.follow_us') }}</span>
                <div class="item-content">
                    <a href="https://github.com/duynguyen14072001" target="_blank"
                        ><GithubFilled
                    /></a>
                    <a href="https://www.linkedin.com/in/duynguyen14072001/" target="_blank"
                        ><LinkedinFilled
                    /></a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    padding: 10px 20px;
    display: flex;
    color: var(--vt-c-white);
    background-color: var(--vt-c-bg-footer);
    gap: 40px;

    .title {
        font-size: 40px;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .item {
            display: flex;
            gap: 30px;

            &-title {
                font-size: 20px;
            }

            &-content {
                display: flex;
                gap: 20px;
                align-items: center;
                .gmail {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                a {
                    &:hover {
                        color: unset;
                    }
                }
            }
        }
    }
}
</style>
