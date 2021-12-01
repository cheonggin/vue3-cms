<template>
  <el-form :label-position="labelPosition" :label-width="labelWidth">
    <el-row>
      <template v-for="item in formItems" :key="item.label">
        <el-col :span="span">
          <el-form-item :label="item.label">
            <!-- input框文本框与密码框 -->
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
  labelPosition: { type: String, default: 'left' },
  labelWidth: { type: String, default: '100px' },
  span: { type: Number, default: 24 },
  formItems: { type: Array, default: () => [] }
})

const emits = defineEmits(['update:modelValue'])

function handleValueChange(value, field) {
  emits('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="scss" scoped></style>
