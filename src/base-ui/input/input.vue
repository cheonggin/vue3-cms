<template>
  <el-row :gutter="gutter">
    <el-col :span="span">
      <el-input v-model="query" clearable :placeholder="placeholder">
        <template #append>
          <el-button :icon="icon" @click="handleClick"></el-button>
        </template>
      </el-input>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  gutter: { type: Number, default: 20 },
  span: { type: Number, default: 8 },
  placeholder: { type: String, default: '' },
  icon: { type: Object, default: () => {} }
})
const emits = defineEmits(['update:modelValue', 'search'])
const query = ref(props.modelValue)

watch(query, newQuery => emits('update:modelValue', newQuery))

function handleClick() {
  emits('search', query.value)
}
</script>

<style lang="scss" scoped>
:deep(.el-input__suffix) {
  align-items: center;
  padding-right: 6px;
}
</style>
