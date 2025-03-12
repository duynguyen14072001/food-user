<script setup lang="ts">
import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue3-i18n'
import * as Img from '@/assets/imgs'
import { getToken, getUser } from '@/helpers'

const { t } = useI18n()
const userString: string | null = getUser()
const user = userString ? JSON.parse(userString) : null

const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
}
</script>

<template>
    <div class="header">
        <div class="left-header">
            <router-link to="/" class="logo">
                <img :src="Img.Logo" alt="Logo" />
            </router-link>
            <router-link to="/">{{ t('header.home') }}</router-link>
            <router-link to="/product">{{ t('header.menu') }}</router-link>
        </div>
        <div class="right-header">
            <div v-if="!getToken()" class="auth">
                <router-link to="/login">{{ t('header.login') }}</router-link>
                <router-link to="/signup">{{ t('header.signup') }}</router-link>
            </div>
            <div v-else class="auth">
                <a-dropdown placement="topLeft">
                    <div class="user">
                        <img :src="user.image_url" alt="" />
                    </div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <router-link class="item__link" to="/cart">
                                    <ShoppingCartOutlined style="font-size: 20px" />
                                    {{ t('header.cart') }}
                                </router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <div class="logout item__link" @click="handleLogout">
                                    <LogoutOutlined style="font-size: 18px" />
                                    {{ t('header.logout') }}
                                </div>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    background-color: var(--vt-c-gray-4);
    color: var(--vt-c-text-header);
    position: fixed;
    width: 100%;
    padding: 20px 40px;
    z-index: 10;
    display: flex;
    justify-content: space-between;

    .left-header,
    .right-header {
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 30px;

        .auth {
            display: flex;
            align-items: center;
            gap: 30px;

            .logout {
                cursor: pointer;
                &:hover {
                    color: var(--vt-c-main);
                }
            }
        }
    }

    .left-header {
        .logo {
            display: flex;
            align-items: center;
            img {
                width: 60px;
                height: 60px;
            }
        }
    }

    .anticon-shopping-cart {
        cursor: pointer;
    }
}

.user {
    img {
        cursor: pointer;
        width: 40px;
        height: 40px;
    }
}

.item__link {
    display: flex;
    gap: 10px;
}
</style>
