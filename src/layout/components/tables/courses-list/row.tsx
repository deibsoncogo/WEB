import { useState } from 'react'
import { api } from '../../../../application/services/api'
import { KTSVG } from '../../../../helpers'
import { ToggleComponent } from '../../../../styles/ts/components'
import { Switch } from '../../inputs/switch'


interface IRow {
  id: string
  name: string
  description: string
  price: string
  discount: string
  teacher: string
  active: string
}

export function Row({ id, name, description, price, discount, teacher, active }: IRow) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState(false);


  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{description}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{price}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{discount}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{teacher}</span>
      </td>
      <td>
      <Switch
        isOn={value}
        handleToggle={() => setValue(!value)}
      />
      </td>
      <td className='text-end'>
        
        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true)
          }}
          className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
        >
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>   
    </tr>
  )
}
