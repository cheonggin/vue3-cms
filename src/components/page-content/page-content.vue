<template>
  <MyTable
    v-model:currentPage="queryInfo.currentPage"
    v-model:pageSize="queryInfo.pageSize"
    v-bind="contentTableConfig"
    :table-data="tableData"
    :total="total"
  >
    <template #status="scope">
      <el-switch
        v-model="scope.row.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </template>

    <template #created="scope">
      {{ $filter.formatTime(scope.row.created) }}
    </template>

    <template #updated="scope">
      {{ $filter.formatTime(scope.row.updated) }}
    </template>

    <template #operate>
      <el-button type="primary" :icon="Edit" size="mini" circle></el-button>
      <el-button type="danger" :icon="Delete" size="mini" circle></el-button>
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
</script>

<style lang="scss" scoped></style>
