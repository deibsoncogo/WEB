import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React from 'react'
import { Button } from '../../buttons/CustomButton'
import { DrawerRight } from '../../drawerRight/DrawerRight'
import { DatePicker, Input, Select, TextArea } from '../../inputs'
import { notificationTypeOptions } from './notificationTypeOptions'

type Props = {
  visible: boolean
  close: () => void
  loading: boolean
  handleFormSubmit: (data: IFormNotification) => void
}

const CreateNotificationDrawer = React.forwardRef<FormHandles, Props>((props, ref) => {
  const { close, handleFormSubmit, loading, visible } = props
  return (
    <DrawerRight title='Nova Notificação' visible={visible} close={close}>
      <div className='mt-3 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={ref} onSubmit={handleFormSubmit} id='create-notification-form'>
          <Input name='tag' label='Tag' type='text' />
          <TextArea
              name='text'
              label='Texto'
              style={{ minHeight: '30px', margin: 0 }}
            />
             <DatePicker
              name='date'
              label='Data'
              placeholderText='00/00/0000'
            />

            <Select
              name='notificationType'
              label='Tipo'
              classes='h-75px'
              defaultValue=''             
            >
              <option disabled value=''>
                Selecione
              </option>
              {notificationTypeOptions.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </Select>

        </Form>


        <div className='d-flex mb-20'>
          <Button
            title='Cancelar'
            type='button'
            disabled={loading}
            onClick={close}
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
          />

          <Button
            type='submit'
            form='create-notification-form'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'
            disabled={loading}
            loading={loading}
          />
        </div>
      </div>
    </DrawerRight>
  )
})
CreateNotificationDrawer.displayName = 'CreateNotificationDrawer'

export { CreateNotificationDrawer }
