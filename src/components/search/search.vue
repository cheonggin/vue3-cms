<template>
  <el-row :gutter="gutter">
    <el-col :span="8">
      <el-input v-model="query" clearable :placeholder="placeholder">
      </el-input>
    </el-col>
    <el-col v-if="isShowAdd" :span="4">
      <el-button type="primary" :icon="Plus" @click="handleClickAdd">
        {{ title }}
      </el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Plus } from '@element-plus/icons'

const props = defineProps({
  modelValue: { type: String, default: '' },
  gutter: { type: Number, default: 20 },
  placeholder: { type: String, default: '' },
  icon: { type: Object, default: () => {} },
  isShowAdd: { type: Boolean, default: true },
  title: { type: String, default: '添加' }
})
const emits = defineEmits(['update:modelValue', 'clear', 'search', 'add'])
const query = ref(props.modelValue)

watch(query, newQuery => emits('update:modelValue', newQuery))

function handleClickAdd() {
  emits('add')
}
</script>

<style lang="scss" scoped>
:deep(.el-input__suffix) {
  align-items: center;
  padding-right: 6px;
}
</style>
