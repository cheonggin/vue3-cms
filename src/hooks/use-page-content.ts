import { ref } from 'vue'

import PageDialog from '@/components/page-dialog'

type CallbackFn = (item?: any) => void

export default function usePageContent(
  addCallback?: CallbackFn,
  editCallback?: CallbackFn
) {
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
  const defaultInfo = ref({})

  function showAddDialog() {
    defaultInfo.value = {}

    if (pageDialogRef.value) {
      pageDialogRef.value.isShowDialog = true
    }

    addCallback && addCallback()
  }

  function showEditDialog(rowData: any) {
    defaultInfo.value = { ...rowData }

    if (pageDialogRef.value) {
      pageDialogRef.value.isShowDialog = true
    }

    editCallback && editCallback()
  }

  return {
    pageDialogRef,
    defaultInfo,
    showAddDialog,
    showEditDialog
  }
}
