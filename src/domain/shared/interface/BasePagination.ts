export interface BasePagination {
  take: number
  page: number
  order: 'asc' | 'desc' | undefined
}
