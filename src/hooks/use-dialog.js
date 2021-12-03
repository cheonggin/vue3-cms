import { ref } from 'vue'

export function useDialog() {
  const myDialogRef = ref(null)
  const defaultInfo = ref({})

  function showDialog() {
    defaultInfo.value = {}
    myDialogRef.value.dialogVisible = true
  }

  function handleEdit(item) {
    defaultInfo.value = item
    myDialogRef.value.dialogVisible = true
  }

  return { myDialogRef, defaultInfo, showDialog, handleEdit }
}
