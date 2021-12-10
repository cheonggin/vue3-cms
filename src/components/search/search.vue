<template>
  <el-row :gutter="gutter">
    <el-col :span="8">
      <el-input v-model="query" clearable :placeholder="placeholder">
      </el-input>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  gutter: { type: Number, default: 20 },
  placeholder: { type: String, default: '' }
})
const emits = defineEmits(['update:modelValue', 'clear', 'search', 'add'])
const query = ref(props.modelValue)

watch(query, newQuery => emits('update:modelValue', newQuery))
</script>

<style lang="scss" scoped>
:deep(.el-input__suffix) {
  align-items: center;
  padding-right: 6px;
}
</style>
