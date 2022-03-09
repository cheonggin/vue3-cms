<template>
  <el-form :label-position="labelPosition" :label-width="labelWidth">
    <el-row>
      <template v-for="item in formData" :key="item.label">
        <el-col :span="span">
          <el-form-item v-if="!item.isHidden" :label="item.label">
            <!-- input框文本框与密码框 -->
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                :model-value="modelValue[`${item.field}`]"
                @update:model-value="handleValueChange($event, item.field)"
              />
            </template>

            <!-- 选择器 -->
            <template v-else-if="item.type === 'select'">
              <el-select
                clearable
                :placeholder="item.placeholder"
                :model-value="modelValue[`${item.field}`]"
                @update:model-value="handleValueChange($event, item.field)"
              >
                <el-option
                  v-for="value in item.options"
                  :key="value.id"
                  :label="value.label"
                  :value="value.id"
                >
                </el-option>
              </el-select>
            </template>

            <!-- 单选框 -->
            <template
              v-else-if="item.type === 'radio'"
              v-for="value in item.options"
              :key="value.label"
            >
              <el-radio
                :model-value="modelValue[`${item.field}`]"
                @update:model-value="handleValueChange($event, item.field)"
                :label="value.label"
                size="large"
              >
                {{ value.text }}
              </el-radio>
            </template>

            <!-- 级联选择器 -->
            <template v-else-if="item.type === 'cascader'">
              <el-cascader
                :options="item.options"
                :props="{ checkStrictly: true, label: 'name', value: 'id' }"
                :placeholder="item.placeholder"
                :model-value="modelValue[`${item.field}`]"
                @update:model-value="handleValueChange($event, item.field)"
                @change="handleChangeCascaderNode($event, item.field)"
                clearable
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import type { IFormItem } from '../types'

const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  labelPosition: { type: String, default: 'right' },
  labelWidth: { type: String, default: 'auto' },
  span: { type: Number, default: 8 },
  formData: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  }
})
const emits = defineEmits(['update:modelValue'])

function handleValueChange(value: any, field: string) {
  emits('update:modelValue', { ...props.modelValue, [field]: value })
}

function handleChangeCascaderNode(value: any, field: string) {
  let val = null
  if (value) {
    val = value.slice().pop()
  }
  emits('update:modelValue', { ...props.modelValue, [field]: val })
}
</script>

<style lang="scss" scoped></style>
