import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { usePaginationType } from '../../../application/hooks/usePagination'

const ranges = ['5', '10', '15', '20']

type PaginationProps = {
  paginationHook: usePaginationType
}
function Pagination({ paginationHook }: PaginationProps) {
  const { goBack, goNext, rangeChange, setCurrentPage, pagination } = paginationHook

  const { currentPage, totalPages } = pagination

  const first = currentPage - 1
  const third = currentPage + 1

  return (
    <div className='card-toolbar d-flex align-items-center'>
      <div className='d-flex align-items-center mx-4'>
        <div className='mx-4'>
          <p className='m-0'>Linhas por página</p>
        </div>

        <select
          onChange={rangeChange}
          className='my-4 p-1 px-4 cursor-pointer'
          style={{ outline: 0 }}
        >
          {ranges.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </div>
      <ul className='pagination'>
        <li className='page-item previous cursor-pointer'>
          <button className='page-link btn-primary' onClick={goBack}>
            <i className='previous'></i>
          </button>
        </li>

        {currentPage > 1 && (
          <li className='page-item'>
            <button className='page-link' onClick={() => setCurrentPage(first)}>
              {first}
            </button>
          </li>
        )}

        <li className='page-item active'>
          <button disabled className='page-link' style={{ color: 'white' }}>
            {currentPage}
          </button>
        </li>

        {third <= totalPages && (
          <li className='page-item'>
            <button className='page-link' onClick={() => setCurrentPage(third)}>
              {third}
            </button>
          </li>
        )}

        <li className='page-item next'>
          <button className='page-link btn-primary' onClick={goNext}>
            <i className='next'></i>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
