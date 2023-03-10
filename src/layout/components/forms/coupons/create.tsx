import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { ChangeEvent, SyntheticEvent } from 'react'

import { Button } from '../../buttons/CustomButton'
import { DrawerRight } from '../../drawerRight/DrawerRight'
import {
  DatePicker,
  Input,
  InputCurrence,
  InputNumber,
  Radio,
  SelectAsync,
  SelectMulti,
} from '../../inputs'

import { ICoupon } from '../../../../domain/models/coupon'
import { IDiscountType } from '../../../templates/coupons/type'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { InputPercentage } from '../../inputs/input-percentage'

type Props = {
  visible: boolean
  loading: boolean
  discountType: IDiscountType
  close: () => void
  changeDiscountType: (event: SyntheticEvent) => void
  onSubmit: (data: ICoupon) => void
  loadOptions: (searchValue: string) => Promise<ISelectOption[]>
}

const CreateCouponDrawerForm = React.forwardRef<FormHandles, Props>((props, ref) => {
  const { close, onSubmit, changeDiscountType, visible, discountType, loading, loadOptions } = props

  const radioOptions = [
    { id: 'percentage', value: 'percentage', label: 'Porcentagem', checked: true },
    { id: 'value', value: 'value', label: 'Valor' },
  ]

  const handleInputNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredInputValue = event.target.value
    const notLettersChar = /[^\w]/g
    const cleanedValue = enteredInputValue.replace(notLettersChar, '')
    if (ref !== null) {
      const formRef = ref as any
      formRef.current.setFieldValue('name', cleanedValue)
    }
  }
  return (
    <DrawerRight title='Novo Cupom' visible={visible} close={close}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={ref} onSubmit={onSubmit} id='create-coupon-form'>
          <Input name='name' label='Código' type='text' onChange={handleInputNameChange} />

          <Radio
            name='type'
            label='Tipo de Desconto'
            options={radioOptions}
            onClick={changeDiscountType}
          />

          {discountType === 'percentage' ? (
            <InputPercentage name='value' label='Porcentagem' />
          ) : (
            <InputCurrence name='value' label='Valor' />
          )}

          <InputNumber name='quantity' label='Quantidade' />

          <DatePicker
            name='expirationDate'
            label='Data de Expiração'
            placeholderText='00/00/0000'
            minDate={new Date()}
            minYearAmount={0}
          />

          <SelectMulti
            name='productId'
            label='Produto'
            classes='h-75px'
            loadOptions={loadOptions}
            numberOfItems={1}
          />
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
            loading={loading}
          />
        </div>
      </div>
    </DrawerRight>
  )
})
CreateCouponDrawerForm.displayName = 'CreateCouponDrawerForm'

export { CreateCouponDrawerForm }
