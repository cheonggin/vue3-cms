<template>
  <el-row>
    <el-col :span="8">
      <el-input
        v-model="query"
        :placeholder="placeholder"
        clearable
        @clear="handleClear"
      >
        <template #append>
          <el-button icon="Search" @click="handleClick"></el-button>
        </template>
      </el-input>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true },
  placeholder: { type: String, default: '' }
})
const emits = defineEmits(['update:modelValue', 'search', 'clear'])

const query = ref(props.modelValue)

watch(
  () => query.value,
  newQuery => emits('update:modelValue', newQuery)
)

function handleClick() {
  emits('search')
}

function handleClear() {
  query.value = ''
  emits('clear', query.value)
}
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
  height: 40px;
  line-height: 40px;
}
</style>
