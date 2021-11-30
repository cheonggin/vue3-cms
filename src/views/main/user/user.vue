<template>
  <el-card>
    <MySearch
      v-model="queryInfo.query"
      :is-show-add="false"
      @clear="onClear"
      @search="onSearch"
    />

    <MyTable
      :table-data="tableData"
      :table-column="tableColumn"
      :total="count"
      :page-size="queryInfo.pageSize"
      :current-page="queryInfo.currentPage"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
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
    </MyTable>
  </el-card>
</template>

<script setup>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

import MySearch from '@/components/search/search.vue'
import MyTable from '@/base-ui/table/table.vue'

import { tableColumn } from './config/table-column'

const state = reactive({
  queryInfo: {
    query: '',
    pageSize: 5,
    currentPage: 1
  },
  tableData: [],
  count: 0
})
const { queryInfo, tableData, count } = toRefs(state)

// vuex
const store = useStore()
store.dispatch('user/getUserListAction', queryInfo.value)
count.value = computed(() => store.state.user.total)
tableData.value = computed(() => store.state.user.userList)

function onClear() {
  queryInfo.value.query = ''

  store.dispatch('user/getUserListAction', queryInfo.value)
}

function onSearch(val) {
  queryInfo.value.query = val

  store.dispatch('user/getUserListAction', queryInfo.value)
}

function onSizeChange(pageSize) {
  queryInfo.value.pageSize = pageSize

  store.dispatch('user/getUserListAction', queryInfo.value)
}

function onCurrentChange(currentPage) {
  queryInfo.value.currentPage = currentPage

  store.dispatch('user/getUserListAction', queryInfo.value)
}
</script>

<style lang="scss" scoped></style>
