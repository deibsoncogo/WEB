export interface InputPagination {
  take?: number
  page: number
  order: 'asc' | 'desc' | undefined
  orderBy?: string
  name?: string
  allRecords?: boolean
}
