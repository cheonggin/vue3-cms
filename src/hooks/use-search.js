import { ref } from 'vue'

export function useSearch() {
  const pageContentRef = ref(null)
  const query = ref('')

  return { query, pageContentRef }
}
