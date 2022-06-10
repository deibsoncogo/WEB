import { ChangeEvent, useState } from 'react'

type PaginationType = {
  totalPages: number
  currentPage: number
  take: number
  order?: 'asc' | 'desc' | undefined
  orderBy?: string
}

export function usePagination() {
  const [pagination, setPagination] = useState<PaginationType>({
    totalPages: 1,
    currentPage: 1,
    take: 5,
  })

  const setCurrentPage = (page: number) => {
    setPagination((oldState) => {
      return { ...oldState, currentPage: page }
    })
  }

  const goNext = () => {
    setPagination((oldState) => {
      const { totalPages, currentPage } = oldState

      const nextPage = currentPage + 1

      return { ...oldState, currentPage: nextPage > totalPages ? totalPages : nextPage }
    })
  }

  const goBack = () => {
    setPagination((oldState) => {
      const { currentPage } = oldState

      const previousPage = currentPage - 1

      return { ...oldState, currentPage: previousPage < 1 ? 1 : previousPage }
    })
  }

  const rangeChange = (value: ChangeEvent<HTMLSelectElement>) => {
    setPagination((oldState) => ({ ...oldState, take: Number(value.target.value), currentPage: 1 }))
  }

  const setTotalPage = (totalItems: number) => {
    setPagination((oldState) => {
      const total = Math.ceil(totalItems / oldState.take)

      return { ...oldState, totalPages: total }
    })
  }

  const handleOrdenation = (orderBy?: string) => {
    const { order, orderBy: currentOrderBy } = pagination
    let updatedOrder = order

    if (currentOrderBy !== orderBy) {
      updatedOrder = undefined
    }

    if (updatedOrder === 'asc') {
      setPagination((oldState) => ({ ...oldState, order: 'desc' }))
      return
    }

    if (updatedOrder === 'desc') {
      setPagination((oldState) => {
        const { currentPage, take, totalPages } = oldState
        return { currentPage, take, totalPages }
      })
      return
    }

    setPagination((oldState) => ({ ...oldState, order: 'asc', orderBy }))
  }

  const getClassToCurrentOrderColumn = (columnName: string) => {
    const { order, orderBy } = pagination
    let orderClass = ''
    if (order && orderBy === columnName) {
      orderClass = order === 'asc' ? 'table-sort-asc' : 'table-sort-desc'
    }
    return orderClass
  }

  return {
    goBack,
    goNext,
    rangeChange,
    setCurrentPage,
    setTotalPage,
    handleOrdenation,
    pagination,
    getClassToCurrentOrderColumn,
  }
}

export type usePaginationType = ReturnType<typeof usePagination>
