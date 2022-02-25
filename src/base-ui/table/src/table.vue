<template>
  <div class="header">
    <slot name="header">
      <div class="title">{{ title }}</div>
      <div class="handler">
        <slot name="headerHandler"></slot>
      </div>
    </slot>
  </div>

  <el-table
    border
    :data="tableData"
    style="width: 100%"
    row-key="id"
    show-overflow-tooltip
  >
    <el-table-column
      v-if="isShowIndex"
      label="序号"
      type="index"
      width="60"
      align="center"
    ></el-table-column>

    <template v-for="item in tableColumn" :key="item.prop">
      <el-table-column v-bind="item">
        <template #default="scope">
          <slot :name="item.prop" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>

  <div v-if="isShowFooter" class="footer">
    <slot name="footer">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 20, 100, 500]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ITableColumn } from '../types'

defineProps({
  // 表格上方文字标题
  title: {
    type: String,
    default: ''
  },
  // 表格数据
  tableData: {
    type: Array,
    default: () => []
  },
  tableColumn: {
    type: Array as PropType<ITableColumn[]>,
    default: () => []
  },
  // 是否显示序号栏
  isShowIndex: {
    type: Boolean,
    default: true
  },
  // 是否展示底部
  isShowFooter: {
    type: Boolean,
    default: true
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  }
})

const emits = defineEmits(['update:pageSize', 'update:currentPage'])

function handleSizeChange(pageSize: number) {
  emits('update:pageSize', pageSize)
}

function handleCurrentChange(currentPage: number) {
  emits('update:currentPage', currentPage)
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 45px;
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    height: 100%;
    align-items: center;

    :deep(.el-button) {
      height: 100%;
    }
  }
}
.el-table {
  margin: 15px 0;
}
</style>
