<script lang="ts" setup>
import { toRefs } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const props = defineProps({
    columns: { type: Array<any>, required: true, default: [] },
    data: { type: Object, required: true },
    loading: { type: Boolean, required: true, default: true },
    showIndex: { type: Boolean, required: false, default: true },
    showCheckbox: { type: Boolean, required: false, default: true },
    showPagination: { type: Boolean, required: false, default: true },
    showSelection: { type: Boolean, required: false, default: true },
    hasCreate: { type: Boolean, required: false, default: true },
    createLink: { type: String, required: false, default: '' },
    title: { type: String, required: false, default: '' },
    sortType: { type: String, required: false, default: '' },
})
const { columns, data, loading, sortType } = toRefs(props)
const emit = defineEmits([
    'changePage',
    'clickButton',
    'sort',
    'clickLink',
    'handleRedirectCreate',
    'cellClick',
    'clickCheckbox',
    'rowSelection',
])

const customRow = (record: any) => {
    return {
        onClick: (event: any) => {
            emit('cellClick', event, record)
        },
    }
}

const handleChangeTable = (pagination: any, filters: any, sorter: any) => {
    if (Object.keys(sorter).length) {
        emit('sort', sorter)
    }
}

const onChange = (pageNumber: number) => {
    emit('changePage', pageNumber)
}

const handleCreate = () => {
    router.push(props.createLink)
}

const rowSelection: any = {
    // hideSelectAll: true,
    onChange: (selectedRowKeys: string[]) => {
        emit('rowSelection', selectedRowKeys)
    },
}
</script>

<template>
    <section id="tbl">
        <a-table
            :columns="columns"
            :data-source="data?.data?.map((item: any) => ({ ...item, key: item.id }))"
            :loading="loading"
            :pagination="false"
            :customRow="customRow"
            :row-selection="props.showSelection && rowSelection"
            :class="sortType"
            @change="handleChangeTable"
        >
            <template #bodyCell="{}" />
        </a-table>
        <div class="tbl-pagination-p" v-if="props.showPagination && data.total">
            <a-pagination
                :total="data.total"
                :page-size="+data.perPage"
                :current="+data.page"
                show-less-items
                @change="onChange"
                class="tbl-pagination"
            />
            <div class="tbl-total">{{ data.total }}trên tổng số{{ data.data?.length }}</div>
        </div>
    </section>
</template>

<style scoped lang="scss">
#tbl {
    .tbl-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;

        .ant-btn {
            border-radius: var(--vt-br-btn);
            background-color: var(--vt-c-main);
            width: 92px;
            height: 36px;
            box-shadow: unset;
        }
    }

    .tbl-pagination-p {
        position: fixed;
        bottom: 20px;
        width: calc(100% - 200px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        gap: 20px;

        .tbl-pagination {
            text-align: center;

            &::after {
                display: unset;
            }

            a {
                &:not([disabled]) {
                    color: var(--vt-c-gray-v9);
                }
            }

            &:deep(.ant-pagination-item) {
                font-weight: 700;
                box-shadow: var(--vt-box-shadow);
                border-radius: 6px;
                margin-inline-end: 5px;
                width: 26px;
                height: 26px;
                padding: 0;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: unset;

                a {
                    color: var(--vt-c-gray-2);
                    font-size: 10px;
                    font-weight: 500;
                }

                &.ant-pagination-item-active {
                    background: var(--vt-c-main);
                    border: var(--vt-c-main);

                    a {
                        color: var(--vt-c-white);
                    }
                }
            }

            &:deep(.ant-pagination-prev) {
                display: none;
            }

            &:deep(.ant-pagination-next) {
                display: none;
            }
        }

        .tbl-total {
            font-size: 12px;
            font-weight: 700;
            color: var(--vt-c-gray-2);
        }
    }

    &:deep(.ant-table) {
        border-radius: 0;

        .ant-table-thead {
            background-color: var(--vt-c-gray-v4);

            .ant-table-column-sorters {
                .ant-table-column-title {
                    color: var(--vt-c-main);
                }
            }

            span {
                svg {
                    display: none;
                }
            }

            .ant-table-cell {
                padding: 8px 12px;
                font-size: 11px;
                font-weight: 500;
                line-height: 16px;
                color: var(--vt-c-main);
                background-color: var(--vt-c-white);
                border-bottom: 1px solid var(--vt-c-white-v2);
            }

            tr:first-child {
                & > *:first-child {
                    border-start-start-radius: 0px;
                }

                & > *:last-child {
                    border-start-end-radius: 0px;
                }
            }
        }

        .ant-table-tbody {
            .ant-table-column-sort {
                background-color: inherit;
            }

            .ant-table-cell {
                padding: 8px 12px;
                font-size: 12px;
                font-weight: 500;
                line-height: 19.2px;
                letter-spacing: 0em;
                color: var(--vt-c-gray-2);
                height: 60px;

                .active {
                    background: var(--vt-c-main);
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 19px;
                    letter-spacing: 0em;
                    text-align: center;
                    color: var(--vt-c-white);
                }

                .inactive {
                    background: var(--vt-c-gray-v11);
                    font-family: 'Noto Sans JP';
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 19px;
                    letter-spacing: 0em;
                    text-align: center;
                    color: var(--vt-c-white);
                }

                .active,
                .inactive {
                    border-radius: 0;
                    width: 70px;
                    height: 24px;
                }

                .update {
                    span {
                        color: var(--vt-c-blue-v3);
                        font-size: 13px;
                    }
                }

                .ant-btn-default {
                    border: none;
                }
            }

            .ant-table-row {
                &:hover {
                    background-color: var(--vt-c-white-v5);
                }
            }
        }

        @media only screen and (max-width: 1000px) {
            overflow-x: auto;

            .ant-table-container {
                width: 700px;
            }
        }
    }

    &:deep(.ant-table-row-selected) {
        .ant-table-cell {
            background-color: unset !important;
        }
    }

    .descending {
        &:deep(.ant-table) {
            .ant-table-thead {
                span {
                    &.ant-table-column-sorter-down {
                        svg {
                            display: block;
                        }
                    }

                    &.ant-table-column-sorter-up {
                        svg {
                            display: none;
                        }
                    }
                }
            }
        }
    }

    .ascending {
        &:deep(.ant-table) {
            .ant-table-thead {
                span {
                    &.ant-table-column-sorter-up {
                        svg {
                            display: block;
                        }
                    }

                    &.ant-table-column-sorter-down {
                        svg {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
