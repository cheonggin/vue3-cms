import { ref } from 'vue'

import PageContent from '@/components/page-content'

export default function usePageDialog(query: string) {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // 修改或添加成功后重新请求数据
  async function handleConfirm() {
    await pageContentRef.value?.getPageData(query)
  }

  return { handleConfirm }
}
