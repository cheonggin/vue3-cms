import { ref, watch } from 'vue'
import PageContent from '@/components/page-content'

export default function usePageSearch() {
  const query = ref('')
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  watch(
    () => query.value,
    newQuery => (query.value = newQuery)
  )

  function onSearch() {
    pageContentRef.value?.getPageData(query.value)
  }

  function onClear(search: string) {
    pageContentRef.value?.getPageData(search)
  }

  return {
    query,
    pageContentRef,
    onSearch,
    onClear
  }
}
