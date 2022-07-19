import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React from 'react'

import { Button } from '../../buttons/CustomButton'
import { DrawerRight } from '../../drawerRight/DrawerRight'
import { DatePicker, Input, InputCurrence, InputNumber, Radio, SelectMulti } from '../../inputs'

import { ICoupon } from '../../../../domain/models/coupon'
import { IDiscountType } from '../../../templates/coupons/type'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { InputPercentage } from '../../inputs/input-percentage'

type Props = {
  visible: boolean
  loading: boolean
  discountType: IDiscountType
  close: () => void
  changeDiscountType: () => void
  onSubmit: (data: ICoupon) => void
  loadProductsOptions: (searchValue: string) => Promise<ISelectOption[]>
}

const CreateCouponDrawerForm = React.forwardRef<FormHandles, Props>((props, ref) => {
  const {
    close,
    onSubmit,
    changeDiscountType,
    loadProductsOptions,
    visible,
    discountType,
    loading,
  } = props

  const radioOptions = [
    { id: 'percentage', value: 'percentage', label: 'Porcentagem', checked: true },
    { id: 'value', value: 'value', label: 'Valor' },
  ]

  return (
    <DrawerRight title='Novo Cupom' visible={visible} close={close}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={ref} onSubmit={onSubmit} id='create-coupon-form'>
          <Input name='name' label='Código' type='text' />

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

          <DatePicker name='expirationDate' label='Data de Expiração' minDate={new Date()} />

          <SelectMulti loadOptions={loadProductsOptions} name='productsId' label='Produtos' />
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
