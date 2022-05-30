
export interface apiPaginationResponse<T>{
    data: T[]
    page: number
    take: number
    total: number
}