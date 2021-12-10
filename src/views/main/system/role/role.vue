<template>
  <el-card>
    <MySearch v-model="query" />

    <PageContent
      ref="pageContentRef"
      :query="query"
      title="添加角色"
      :content-table-config="contentTableConfig"
      page-name="role"
      @add="handleCreate"
      @edit="handleEdit"
    />

    <MyDialog
      ref="myDialogRef"
      page-name="role"
      :form-config="formConfig"
      :default-info="defaultInfo"
      :permission-list="permissionList"
    >
      <el-tree
        ref="elTreeRef"
        :data="menuList"
        show-checkbox
        node-key="_id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleChangeCheck"
      />
    </MyDialog>
  </el-card>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'

import MySearch from '@/components/search/search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import MyDialog from '@/components/dialog/dialog.vue'

import { contentTableConfig } from './config/table.config'
import { formConfig } from './config/form.config'
import { useSearch } from '@/hooks/use-search'
import { useDialog } from '@/hooks/use-dialog'

// hooks
const { query, pageContentRef } = useSearch()
const { myDialogRef, defaultInfo, handleCreate, handleEdit } = useDialog(
  null,
  editFn
)

// data
const elTreeRef = ref(null)
const permissionList = ref({})

// vuex
const store = useStore()
const menuList = computed(() => store.state.entireMenu)

function handleChangeCheck(list, data) {
  const { checkedKeys, halfCheckedKeys } = data
  permissionList.value = { checkedKeys, halfCheckedKeys }
}

function editFn(item) {
  nextTick(async () => {
    await nextTick()
    elTreeRef.value.setCheckedKeys(item.permissionList.checkedKeys)
  })
}
</script>

<style lang="scss" scoped></style>
