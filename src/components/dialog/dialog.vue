<template>
  <el-dialog v-model="dialogVisible" width="50%" center>
    <MyForm v-model="formData" v-bind="formConfig"></MyForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import MyForm from '@/base-ui/form/form.vue'

const dialogVisible = ref(false)
const formData = ref({})

const props = defineProps({
  formConfig: { type: Object, required: true },
  defaultInfo: { type: Object, default: () => {} },
  pageName: { type: String, require: true, default: '' }
})
defineExpose({ dialogVisible, formData })

// vuex
const store = useStore()

watch(
  () => props.defaultInfo,
  newVal => {
    for (const item of props.formConfig.formItems) {
      formData.value[`${item.field}`] = newVal[`${item.field}`]
    }
  }
)

function handleConfirm() {
  dialogVisible.value = false
  const _len = Object.keys(props.defaultInfo).length

  if (_len === 0) {
    // 添加
    store.dispatch('main/createPageDataAction', {
      pageName: props.pageName,
      addData: formData.value
    })
  } else {
    // 修改
    store.dispatch('main/editPageDataAction', {
      pageName: props.pageName,
      id: props.defaultInfo._id,
      editData: formData.value
    })
  }
}
</script>

<style lang="scss" scoped></style>
