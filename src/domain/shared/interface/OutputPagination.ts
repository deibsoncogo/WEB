export interface OutputPagination<ReturnType> {
  data: ReturnType[]
  total: number
  page: number
}
