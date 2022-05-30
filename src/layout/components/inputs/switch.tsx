


export function Switch({ isOn, handleToggle, id }: any) {

    
  return (
    <div className='d-block'>
      <div className='form-check form-switch form-switch-sm form-check-custom'>
        <input
          className='form-check-input'
          type='checkbox'
          id= {id}
          checked={isOn}
          onChange={handleToggle}
        />
       </div>
    </div>
  )
}
