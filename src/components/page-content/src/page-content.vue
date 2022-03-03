<template>
  <MyTable
    :table-data="list"
    v-bind="tableConfig"
    :total="total"
    :title="title"
    v-model:currentPage="queryInfo.offset"
    v-model:pageSize="queryInfo.limit"
  >
    <template #headerHandler>
      <el-button type="primary" icon="Plus" @click="handleAddClick">{{
        text
      }}</el-button>
    </template>

    <template #create_at="scope">
      {{ formatUtcString(scope.row.create_at) }}
    </template>

    <template #update_at="scope">
      {{ formatUtcString(scope.row.update_at) }}
    </template>

    <template #operate="scope">
      <el-button
        type="primary"
        icon="Edit"
        circle
        @click="handleEditClick(scope.row)"
      ></el-button>
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="取消"
        icon-color="red"
        title="确定删除吗？"
        @confirm="handleDeleteClick(scope.row.id)"
        @cancel="cancelEvent"
      >
        <template #reference>
          <el-button type="danger" icon="Delete" circle></el-button>
        </template>
      </el-popconfirm>
    </template>

    <!-- 动态插入其它的插槽 -->
    <template v-for="item in otherSlots" :key="item.prop" #[item.prop]="scope">
      <slot :name="item.prop" :row="scope.row"></slot>
    </template>
  </MyTable>
</template>

<script setup lang="ts">
import { computed, PropType, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

import MyTable, { ITableConfig } from '@/base-ui/table'
import { useMainStore } from '@/store/main'
import { formatUtcString } from '@/utils/format-time'

import type { IMainState } from '@/store/main/types/main.type'

const props = defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  tableConfig: { type: Object as PropType<ITableConfig>, default: () => {} },
  query: { type: String, default: '' },
  pageName: { type: String, required: true }
})
const emits = defineEmits(['add', 'edit'])
const queryInfo = reactive({
  offset: 1,
  limit: 10
})
// 获取除create_at、update_at、operate外的其它插槽
const otherSlots = props.tableConfig.tableColumn.filter(item => {
  if (item.prop === 'create_at') return false
  if (item.prop === 'update_at') return false
  if (item.prop === 'operate') return false
  return true
})

const mainStore = useMainStore()

async function getPageData(query: string) {
  await mainStore.getPageListAction(props.pageName, {
    query,
    offset: (queryInfo.offset - 1) * queryInfo.limit,
    limit: queryInfo.limit
  })
}
getPageData(props.query)

const list = computed(
  () => mainStore[`${props.pageName}List` as keyof IMainState]
)
const total = computed(
  () => mainStore[`${props.pageName}Total` as keyof IMainState]
)

watch(
  () => queryInfo,
  () => getPageData(props.query),
  { deep: true }
)

function handleAddClick() {
  emits('add')
}

function handleEditClick(row: any) {
  emits('edit', row)
}

async function handleDeleteClick(id: number) {
  await mainStore.deletePageDataAction(props.pageName, id)
  getPageData(props.query)
}

function cancelEvent() {
  ElMessage.info('已取消')
}

defineExpose({ getPageData })
</script>

<style scoped></style>
