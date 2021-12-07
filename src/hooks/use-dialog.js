import { ref } from 'vue'

export function useDialog(addFn, editFn) {
  const myDialogRef = ref(null)
  const defaultInfo = ref({})

  function showDialog() {
    addFn && addFn()
    defaultInfo.value = {}
    myDialogRef.value.dialogVisible = true
  }

  function handleEdit(item) {
    editFn && editFn(item)
    defaultInfo.value = item
    myDialogRef.value.dialogVisible = true
  }

  return { myDialogRef, defaultInfo, showDialog, handleEdit }
}
