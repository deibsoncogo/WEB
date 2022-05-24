


export function Switch({ isOn, handleToggle }: any) {

    
  return (
    <div className='d-block'>
      <div className='form-check form-switch form-switch-sm form-check-custom'>
        <input
          className='form-check-input'
          type='checkbox'
          value=''
          id='flexSwitchChecked'
          checked={isOn}
          onChange={handleToggle}
        />
       </div>
    </div>
  )
}
