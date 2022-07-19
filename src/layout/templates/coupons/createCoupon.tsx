import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { ICoupon } from '../../../domain/models/coupon'
import { CreateCouponParams, ICreateCoupon } from '../../../domain/usecases/interfaces/coupon'
import { formatDate } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { CreateCouponDrawerForm } from '../../components/forms/coupons/create'
import { onlyNums } from '../../formatters/currenceFormatter'
import { couponFormSchema, IDiscountType } from './type'

type Props = {
  visible: boolean
  close: () => void
  remoteCreateCoupon: ICreateCoupon
}

const CreateCoupon = ({ remoteCreateCoupon, visible, close }: Props) => {
  const [currentTypeSelected, setCurrentTypeSelected] = useState<IDiscountType>('value')
  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: createCoupon,
    loading: loadingCouponCreation,
    error: createCouponError,
    data: couponCreatedSuccessful,
    cleanUp: cleanUpCreateCoupon,
  } = useRequest<void, CreateCouponParams>(remoteCreateCoupon.create)

  async function handleFormSubmit(data: ICoupon) {
    const { error, success } = await applyYupValidation<ICoupon>(couponFormSchema, {
      ...data,
      value: currentTypeSelected === 'value' ? Number(onlyNums(data.value)) : data.value,
      expirationDate: formatDate(new Date(data.expirationDate), 'YYYY-MM-DD'),
    })

    if (!!error) {
      console.log(error)
      formRef?.current?.setErrors(error)
      return
    }

    if (success) {
      createCoupon(success)
    }
  }

  function changeDiscountType() {
    const updatedType = currentTypeSelected === 'percentage' ? 'value' : 'percentage'
    setCurrentTypeSelected(updatedType)
    formRef.current?.setFieldValue('type', updatedType)
  }

  function closeDrawer() {
    formRef.current?.reset()
    formRef.current?.setErrors({})
    close()
  }

  useEffect(() => {
    formRef.current?.setFieldValue('type', currentTypeSelected)
  }, [visible])

  useEffect(() => {
    if (couponCreatedSuccessful) {
      toast.success('Cupom criado com sucesso')
      cleanUpCreateCoupon()
      closeDrawer()
    }
  }, [couponCreatedSuccessful])

  useEffect(() => {
    if (createCouponError) {
      toast.error(createCouponError)
      cleanUpCreateCoupon()
    }
  }, [createCouponError])

  return (
    <CreateCouponDrawerForm
      visible={visible}
      ref={formRef}
      onSubmit={handleFormSubmit}
      changeDiscountType={changeDiscountType}
      discountType={currentTypeSelected}
      loading={loadingCouponCreation}
      close={closeDrawer}
    />
  )
}

export { CreateCoupon }
