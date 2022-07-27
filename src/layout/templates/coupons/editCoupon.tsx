import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { ICoupon } from '../../../domain/models/coupon'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { CreateCouponParams, IUpdateCoupon } from '../../../domain/usecases/interfaces/coupon'
import { IGetAllAvailableProducts } from '../../../domain/usecases/interfaces/product/getAllAvailableProducts'
import { IGetAllProducts } from '../../../domain/usecases/interfaces/product/getAllProducts'
import { formatDate } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { extractSelectOptionsFromArr } from '../../../utils/extractSelectOptionsFromArr'
import { getOptionsFromSearchRequest } from '../../../utils/getOptionsFromSearchRequest'
import { EditCouponDrawerForm } from '../../components/forms/coupons/edit'
import { maskedToMoney, onlyNums } from '../../formatters/currenceFormatter'
import { couponFormSchema, IDiscountType } from './type'
import { extractFormattedProductOptions } from './utils/extractFormattedOptions'

type Props = {
  coupon: ICoupon | null
  visible: boolean
  close: () => void
  remoteUpdateCoupon: IUpdateCoupon
  remoteGetAllAvailableProducts: IGetAllAvailableProducts
}

const EditCoupon = ({
  remoteUpdateCoupon,
  visible,
  coupon,
  close,
  remoteGetAllAvailableProducts,
}: Props) => {
  const [currentTypeSelected, setCurrentTypeSelected] = useState<IDiscountType>('percentage')
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

  async function handleGetProductOptions(searchValue: string): Promise<ISelectOption[]> {
    const productOptionHasType = true
    const options = await getOptionsFromSearchRequest({
      request: remoteGetAllAvailableProducts.getAll,
      search: {
        name: searchValue || '',
        allRecords: true,
      },
      hasType: productOptionHasType,
    })
    return extractFormattedProductOptions(options)
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

      formRef.current?.setFieldValue('value', `${coupon.value}%`)
      if (coupon.type === 'value') {
        formRef.current?.setFieldValue('value', maskedToMoney(coupon.value))
      }
      formRef.current?.setFieldValue('name', coupon.name)
      formRef.current?.setFieldValue('type', coupon.type)
      formRef.current?.setFieldValue('quantity', coupon.quantity)
      formRef.current?.setFieldValue('expirationDate', expirationDate)

      const hasProductType = true
      formRef.current?.setFieldValue(
        'productsId',
        extractSelectOptionsFromArr(coupon.products, hasProductType)
      )
    }
  }, [coupon])

  return (
    <EditCouponDrawerForm
      ref={formRef}
      visible={visible}
      discountType={currentTypeSelected}
      loading={loadingCouponCreation}
      close={closeDrawer}
      onSubmit={handleFormSubmit}
      changeDiscountType={changeDiscountType}
      loadProductsOptions={handleGetProductOptions}
    />
  )
}

export { EditCoupon }
