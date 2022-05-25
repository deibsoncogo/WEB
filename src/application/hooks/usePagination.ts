import { ChangeEvent, useState } from 'react'

export function usePagination() {
  const [pagination, setPagination] = useState({
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

  return { goBack, goNext, rangeChange, setCurrentPage, setTotalPage, pagination }
}

export type usePaginationType = ReturnType<typeof usePagination>
