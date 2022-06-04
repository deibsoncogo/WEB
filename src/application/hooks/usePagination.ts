import { ChangeEvent, useState } from 'react'

type PaginationType = {
  totalPages: number
  currentPage: number
  take: number
  order?: 'asc' | 'desc'
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

  const handleOrdenation = () => {
    console.log('Click')
    const { order } = pagination

    if (order === 'asc') {
      setPagination((oldState) => ({ ...oldState, order: 'desc' }))
      return
    }

    if (order === 'desc') {
      setPagination((oldState) => {
        const { currentPage, take, totalPages } = oldState
        return { currentPage, take, totalPages }
      })
      return
    }

    setPagination((oldState) => ({ ...oldState, order: 'asc' }))
  }

  return { goBack, goNext, rangeChange, setCurrentPage, setTotalPage, handleOrdenation, pagination }
}

export type usePaginationType = ReturnType<typeof usePagination>
