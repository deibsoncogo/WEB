import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { formatDate } from '../../../../../helpers'
import { Button } from '../../../buttons/CustomButton'
import { DrawerRight } from '../../../drawerRight/DrawerRight'
import { useRequest } from '../../../../../application/hooks/useRequest'
import { Input, InputNumber, DatePicker, Radio, InputCurrence } from '../../../inputs'

import { ICoupon } from '../../../../../domain/models/coupon'
import { CreateCouponParams, ICreateCoupon } from '../../../../../domain/usecases/interfaces/coupon'

type Props = {
  visible: boolean
  close: () => void
  remoteCreateCoupon: ICreateCoupon
}

const radioOptions = [
  { id: 'percentage', value: 'percentage', label: 'Porcentagem' },
  { id: 'value', value: 'value', label: 'Valor' },
]

const CreateCouponDrawer = React.forwardRef<FormHandles, Props>((props) => {
  const { close, visible, remoteCreateCoupon } = props

  const [isCurrentTypeSelected, setIsCurrentTypeSelected] = useState('')

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: createCoupon,
    loading: loadingCouponCreation,
    error: createCouponError,
    data: couponCreated,
    cleanUp: cleanUpCreateCoupon,
  } = useRequest<void, CreateCouponParams>(remoteCreateCoupon.create)

  function handleSubmit() {
    console.log('Submit')
  }

  async function handleFormSubmit(data: any) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Código é necessário'),
        value: Yup.number()
          .min(1, 'Valor mínimo não pode ser vazio')
          .required('Valor é necessário'),
        type: Yup.string().required('Tipo é necessário'),
        quantity: Yup.number()
          .min(1, 'Devem ter no mínico um cupom')
          .required('Quantidade é necessária'),
        expirationDate: Yup.string().required('Data é necessária'),
      })

      await schema.validate(data, { abortEarly: false })

      const dataToSend = formatDataToSend(data)
      createCoupon(dataToSend)
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          // @ts-ignore
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
      }
    }
  }

  function formatDataToSend(data: ICoupon) {
    let tempData = data
    tempData.name = data.name.toUpperCase()
    tempData.expirationDate = formatDate(data.expirationDate, 'yyyy-MM-DD')
    tempData.isActive = false
    return tempData
  }

  function OnChangeOption() {
    if (!formRef.current) throw new Error()

    if (formRef.current.getFieldValue('type') === 'percentage')
      setIsCurrentTypeSelected('percentage')
    else if (formRef.current.getFieldValue('type') === 'value') setIsCurrentTypeSelected('value')
  }

  function closeDrawer() {
    formRef.current?.reset()
    formRef.current?.setErrors({})
    close()
  }

  return (
    <DrawerRight title='Novo Cupom' visible={visible} close={closeDrawer}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={formRef} onSubmit={handleFormSubmit} id='create-coupon-form'>
          <Input name='name' label='Código' type='text' />

          <Radio
            name='type'
            label='Tipo de Desconto'
            options={radioOptions}
            onChange={OnChangeOption}
          />

          {isCurrentTypeSelected === 'percentage' ? (
            <InputNumber name='value' label='Porcentagem' />
          ) : isCurrentTypeSelected === 'value' ? (
            <InputCurrence name='value' label='Valor' />
          ) : null}

          <InputNumber name='quantity' label='Quantidade' />
          <DatePicker name='expirationDate' label='Data de Expiração' minDate={new Date()} />
        </Form>

        <div className='d-flex mb-15'>
          <Button
            title='Cancelar'
            type='button'
            onClick={close}
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
          />

          <Button
            type='submit'
            form='create-coupon-form'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'
            loading={loadingCouponCreation}
          />
        </div>
      </div>
    </DrawerRight>
  )
})
CreateCouponDrawer.displayName = 'CreateCouponDrawer'

export { CreateCouponDrawer }
