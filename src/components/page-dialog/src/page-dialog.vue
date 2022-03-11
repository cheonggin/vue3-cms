<template>
  <el-dialog
    v-model="isShowDialog"
    :title="title"
    width="50%"
    draggable
    center
    destroy-on-close
  >
    <MyForm v-bind="formConfig" v-model="formModel" />
    <slot></slot>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'

import MyForm, { IFormConfig } from '@/base-ui/form'

import { useMainStore } from '@/store/main'

const props = defineProps({
  tip: { type: String, default: '' },
  defaultInfo: { type: Object, default: () => {} },
  formConfig: { type: Object as PropType<IFormConfig>, default: () => {} },
  pageName: { type: String, require: true, default: '' },
  permissionList: { type: Object, default: () => {} }
})
const isShowDialog = ref(false)
const formModel = ref<any>({})
const title = ref('')
const mainStore = useMainStore()

watch(
  () => props.defaultInfo,
  newVal => {
    const _len = Object.keys(props.defaultInfo).length
    title.value = _len > 0 ? `编辑${props.tip}` : `添加${props.tip}`

    for (const item of props.formConfig.formData) {
      formModel.value[`${item.field}`] = newVal[`${item.field}`]
    }
  }
)

async function handleConfirm() {
  isShowDialog.value = false

  // 根据defaultInfo参数个数判断是添加还是编辑
  const _len = Object.keys(props.defaultInfo).length

  if (_len > 0) {
    // 编辑
    await mainStore.updatePageDataAction(props.pageName, props.defaultInfo.id, {
      ...formModel.value,
      ...props.permissionList
    })
  } else {
    // 添加
    await mainStore.addPageDataAction(props.pageName, {
      ...formModel.value,
      ...props.permissionList
    })
  }
}

defineExpose({ isShowDialog, formModel })
</script>

<style scoped></style>
