import { Dispatch, SetStateAction } from 'react'

interface ISwitch {
  active: boolean
  setModalUpdate: Dispatch<SetStateAction<boolean>>
}

export function Switch({ active, setModalUpdate }: ISwitch) {
  return (
    <>
      <div className='d-block'>
        <div className='form-check form-switch form-switch-sm form-check-custom'>
          <input
            onClick={() => {
              setModalUpdate(true)
            }}
            className='form-check-input'
            type='checkbox'
            checked={active}
            readOnly
          />
        </div>
      </div>
    </>
  )
}
