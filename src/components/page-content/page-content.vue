<template>
  <MyTable
    v-model:currentPage="queryInfo.currentPage"
    v-model:pageSize="queryInfo.pageSize"
    v-bind="contentTableConfig"
    :table-data="tableData"
    :total="total"
  >
    <template #created="scope">
      {{ $filter.formatTime(scope.row.created) }}
    </template>

    <template #updated="scope">
      {{ $filter.formatTime(scope.row.updated) }}
    </template>

    <template #operate="scope">
      <el-button
        type="primary"
        :icon="Edit"
        size="mini"
        circle
        @click="handleEdit(scope.row)"
      ></el-button>
      <el-popconfirm
        title="确定删除该数据吗？"
        @confirm="handleDelete(scope.row._id)"
      >
        <template #reference>
          <el-button
            type="danger"
            :icon="Delete"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-popconfirm>
    </template>

    <!-- 动态插入剩余插槽 -->
    <template v-for="item in otherSlots" :key="item.prop" #[item.prop]="scope">
      <slot :name="item.prop" :row="scope.row"></slot>
    </template>
  </MyTable>
</template>

<script setup>
import { reactive, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { Edit, Delete } from '@element-plus/icons'

import MyTable from '@/base-ui/table/table.vue'
import { debounce } from '@/utils/debounce'

const props = defineProps({
  contentTableConfig: { type: Object, required: true, default: () => {} },
  pageName: { type: String, required: true },
  query: { type: String, default: '' }
})
const emits = defineEmits(['edit'])
defineExpose({ getPageData })

const state = reactive({
  queryInfo: {
    query: props.query,
    pageSize: 5,
    currentPage: 1
  }
})

const { queryInfo } = toRefs(state)

watch(
  () => props.query,
  newQuery => (queryInfo.value.query = newQuery)
)
watch(
  queryInfo,
  debounce(newVal => getPageData(newVal)),
  {
    deep: true
  }
)

// 获取其它动态插槽
const otherSlots = props.contentTableConfig.tableColumn.filter(item => {
  if (item.prop === 'created') return false
  if (item.prop === 'updated') return false
  if (item.prop === 'operate') return false
  return true
})

// vuex
const store = useStore()
getPageData(queryInfo.value)
const total = computed(() =>
  store.getters['main/pageListTotal'](props.pageName)
)
const tableData = computed(() =>
  store.getters['main/pageListData'](props.pageName)
)

function getPageData(queryInfo) {
  store.dispatch('main/getPageListAction', {
    pageName: props.pageName,
    queryInfo: { pageSize: 5, currentPage: 1, ...queryInfo }
  })
}

function handleDelete(id) {
  store.dispatch('main/deletePageDataAction', { pageName: props.pageName, id })
}

function handleEdit(item) {
  emits('edit', item)
}
</script>

<style lang="scss" scoped></style>
