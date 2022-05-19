import React from 'react'

function Pagination() {
  return (
    <div className='card-toolbar'>
      <ul className='pagination'>
        <li className='page-item previous disabled'>
          <a href='#' className='page-link'>
            <i className='previous'></i>
          </a>
        </li>
        <li className='page-item'>
          <a href='#' className='page-link'>
            1
          </a>
        </li>
        <li className='page-item active'>
          <a href='#' className='page-link'>
            2
          </a>
        </li>
        <li className='page-item'>
          <a href='#' className='page-link'>
            3
          </a>
        </li>
        <li className='page-item next'>
          <a href='#' className='page-link'>
            <i className='next'></i>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
