/*eslint-disable*/
import 'vue-router'
import { IBreadcrumb } from '@/components/breadcrumb'

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumbList?: IBreadcrumb[]
  }
}
