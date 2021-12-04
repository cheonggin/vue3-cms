<template>
  <el-table
    border
    :data="tableData"
    style="width: 100%"
    row-key="_id"
    show-overflow-tooltip
  >
    <el-table-column
      v-if="isShowIndex"
      label="序号"
      type="index"
      width="50"
      align="center"
    ></el-table-column>

    <template v-for="(item, index) in tableColumn" :key="index">
      <el-table-column v-bind="item" align="center">
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
        :page-sizes="[5, 10, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  tableColumn: {
    type: Array,
    default: () => []
  },
  isShowIndex: {
    type: Boolean,
    default: true
  },
  isShowOperate: {
    type: Boolean,
    default: true
  },
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
    default: 5
  }
})

const emits = defineEmits(['update:pageSize', 'update:currentPage'])

function handleSizeChange(pageSize) {
  emits('update:pageSize', pageSize)
}

function handleCurrentChange(currentPage) {
  emits('update:currentPage', currentPage)
}
</script>

<style lang="scss" scoped>
.el-table {
  margin: 15px 0;
}
</style>
