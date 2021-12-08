<template>
  <el-form :label-position="labelPosition" :label-width="labelWidth">
    <el-row>
      <template v-for="item in formItems" :key="item.label">
        <el-col :span="span">
          <el-form-item v-if="!item.isHidden" :label="item.label">
            <!-- input框文本框与密码框 -->
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </template>

            <!-- select选择框 -->
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                style="width: 100%"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
                <el-option
                  v-for="val in item.options"
                  :key="val.value"
                  :label="val.label"
                  :value="val.value"
                >
                </el-option>
              </el-select>
            </template>

            <!-- 级联选择器 -->
            <template v-else-if="item.type === 'cascader'">
              <el-cascader
                :options="item.options"
                :props="{ emitPath: true, checkStrictly: true }"
                clearable
                :placeholder="item.placeholder"
                style="width: 100%"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </template>

            <!-- 单选框 -->
            <template v-else-if="item.type === 'radio'">
              <el-radio
                v-for="value in item.options"
                :key="value.label"
                :model-value="modelValue[`${item.field}`]"
                :label="value.label"
                @update:modelValue="handleValueChange($event, item.field)"
                >{{ value.text }}</el-radio
              >
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
