import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { ICoupon } from '../../../domain/models/coupon'
import { CreateCouponParams, IUpdateCoupon } from '../../../domain/usecases/interfaces/coupon'
import { formatDate } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { EditCouponDrawerForm } from '../../components/forms/coupons/edit'
import { onlyNums } from '../../formatters/currenceFormatter'
import { couponFormSchema, IDiscountType } from './type'

type Props = {
  coupon: ICoupon | null
  visible: boolean
  close: () => void
  remoteUpdateCoupon: IUpdateCoupon
}

const EditCoupon = ({ remoteUpdateCoupon, visible, coupon, close }: Props) => {
  const [currentTypeSelected, setCurrentTypeSelected] = useState<IDiscountType>('value')
  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: updateCoupon,
    loading: loadingCouponCreation,
    error: updateCouponError,
    data: couponEditedSuccessful,
    cleanUp: cleanUpEditCoupon,
  } = useRequest<void, CreateCouponParams>(remoteUpdateCoupon.update)

  async function handleFormSubmit(data: ICoupon) {
    const { error, success } = await applyYupValidation<ICoupon>(couponFormSchema, {
      ...data,
      value: currentTypeSelected === 'value' ? Number(onlyNums(data.value)) : data.value,
      expirationDate: formatDate(new Date(data.expirationDate), 'YYYY-MM-DD'),
    })

    if (!!error) {
      formRef?.current?.setErrors(error)
      return
    }

    if (success && coupon?.id) {
      success.id = coupon.id
      updateCoupon(success)
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
    if (couponEditedSuccessful) {
      toast.success('Cupom atualizado com sucesso')
      cleanUpEditCoupon()
      closeDrawer()
    }
  }, [couponEditedSuccessful])

  useEffect(() => {
    if (updateCouponError) {
      toast.error(updateCouponError)
      cleanUpEditCoupon()
    }
  }, [updateCouponError])

  useEffect(() => {
    if (coupon) {
      const expirationDate = new Date(coupon.expirationDate)
      expirationDate.setDate(expirationDate.getDay() + 1)

      formRef.current?.setFieldValue('name', coupon.name)
      formRef.current?.setFieldValue('type', coupon.type)
      formRef.current?.setFieldValue('value', coupon.value)
      formRef.current?.setFieldValue('quantity', coupon.quantity)
      formRef.current?.setFieldValue('expirationDate', expirationDate)
    }
  }, [coupon])

  return (
    <EditCouponDrawerForm
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

export { EditCoupon }
