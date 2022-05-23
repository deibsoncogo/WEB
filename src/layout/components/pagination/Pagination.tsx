import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'

const ranges = ['5', '10', '15', '20']

function Pagination() {
  const [{ currentPage, totalPages }, setPagination] = useState({
    totalPages: 4,
    currentPage: 1,
    take: 5,
  })

  const first = currentPage - 1
  const third = currentPage + 1

  const handleSetCurrentPage = (page: number) => {
    setPagination((oldState) => {
      return { ...oldState, currentPage: page }
    })
  }

  const handleGoNext = () => {
    setPagination((oldState) => {
      const { totalPages, currentPage } = oldState

      const nextPage = currentPage + 1

      return { ...oldState, currentPage: nextPage > totalPages ? totalPages : nextPage }
    })
  }

  const handleGoBack = () => {
    setPagination((oldState) => {
      const { currentPage } = oldState

      const previousPage = currentPage - 1

      return { ...oldState, currentPage: previousPage < 1 ? 1 : previousPage }
    })
  }

  const handleRangeChange = (value: ChangeEvent<HTMLSelectElement>) => {
    setPagination((oldState) => ({ ...oldState, take: Number(value.target.value) }))
  }

  return (
    <div className='card-toolbar d-flex align-items-center'>
      <div className='d-flex align-items-center mx-4'>
        <div className='mx-4'>
          <p className='m-0'>Linhas por página</p>
        </div>

        <select onChange={handleRangeChange} className='my-4 p-1 px-4 cursor-pointer border-gray'>
          {ranges.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </div>
      <ul className='pagination'>
        <li className='page-item previous cursor-pointer'>
          <button className='page-link' onClick={handleGoBack}>
            <i className='previous'></i>
          </button>
        </li>

        {currentPage > 1 && (
          <li className='page-item'>
            <button className='page-link' onClick={() => handleSetCurrentPage(first)}>
              {first}
            </button>
          </li>
        )}

        <li className='page-item active'>
          <button disabled className='page-link'>
            {currentPage}
          </button>
        </li>

        {third <= totalPages && (
          <li className='page-item'>
            <button className='page-link' onClick={() => handleSetCurrentPage(third)}>
              {third}
            </button>
          </li>
        )}

        <li className='page-item next'>
          <button className='page-link' onClick={handleGoNext}>
            <i className='next'></i>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
