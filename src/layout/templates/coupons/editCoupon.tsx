import { FormHandles } from '@unform/core'
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { ICoupon } from '../../../domain/models/coupon'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { CreateCouponParams, IUpdateCoupon } from '../../../domain/usecases/interfaces/coupon'
import { IGetAllAvailableProducts } from '../../../domain/usecases/interfaces/product/getAllAvailableProducts'
import { formatDate } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { extractSelectOptionsFromArr } from '../../../utils/extractSelectOptionsFromArr'
import { getOptionsFromSearchRequest } from '../../../utils/getOptionsFromSearchRequest'
import { EditCouponDrawerForm } from '../../components/forms/coupons/edit'
import { maskedToMoney, onlyNums } from '../../formatters/currenceFormatter'
import { couponFormSchema, IDiscountType } from './type'
import { extractFormattedProductOptions } from './utils/extractFormattedOptions'
import { getProductErrorMessageCoupon } from './utils/getProductErrorMessageCoupon'

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
  const [isFirstLoad, setIsFirstLoad] = useState(false)
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
      value:
        currentTypeSelected === 'value'
          ? Number(onlyNums(data.value))
          : Number(String(data.value).replace('%', '')),
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

  function changeDiscountType(e: BaseSyntheticEvent) {
    setCurrentTypeSelected(e.target.id)
    formRef.current?.setFieldValue('type', e.target.id)
  }

  function closeDrawer() {
    formRef.current?.reset()
    formRef.current?.setErrors({})
    setIsFirstLoad(false)
    close()
  }

  async function handleGetProductOptions(searchValue: string): Promise<ISelectOption[]> {
    const productOptionHasType = true
    const products = await getOptionsFromSearchRequest({
      request: remoteGetAllAvailableProducts.getAll,
      search: {
        name: searchValue || '',
        allRecords: true,
      },
      hasType: productOptionHasType,
    })

    return extractFormattedProductOptions(products)
  }

  useEffect(() => {
    formRef.current?.setFieldValue('type', currentTypeSelected)
  }, [visible])

  useEffect(() => {
    if (couponEditedSuccessful) {
      toast.success('Cupom editado com sucesso')
      cleanUpEditCoupon()
      closeDrawer()
    }
  }, [couponEditedSuccessful])

  useEffect(() => {
    if (updateCouponError) {
      const isValueProductError = String(updateCouponError).includes(
        'product value less than discount:'
      )

      if (isValueProductError) {
        const productName = getProductErrorMessageCoupon(updateCouponError)
        formRef.current?.setErrors({
          productId: `O Produto ${productName} tem o valor menor que o valor do desconto`,
        })
        return
      }

      toast.error(updateCouponError)
      cleanUpEditCoupon()
    }
  }, [updateCouponError])

  useEffect(() => {
    if (coupon) {
      const expirationDate = new Date(coupon.expirationDate)
      expirationDate.setDate(expirationDate.getDay() + 1)

      if (coupon.type === 'value') {
        setCurrentTypeSelected('value')
      }

      if (coupon.type === 'percentage') {
        setCurrentTypeSelected('percentage')
      }

      formRef.current?.setFieldValue('name', coupon.name)
      formRef.current?.setFieldValue('type', coupon.type)
      formRef.current?.setFieldValue('quantity', coupon.quantity)
      formRef.current?.setFieldValue('expirationDate', expirationDate)

      if (coupon?.product?.id) {
        formRef.current?.setFieldValue(
          'productId',
          extractSelectOptionsFromArr([coupon.product], true)
        )
      }
      setIsFirstLoad(true)
    }
  }, [coupon])

  useEffect(() => {
    if (isFirstLoad && coupon) {
      if (coupon.type === 'value') {
        formRef.current?.setFieldValue('value', maskedToMoney(coupon.value))
      }

      if (coupon.type === 'percentage') {
        formRef.current?.setFieldValue('value', `${coupon.value}%`)
      }
      setIsFirstLoad(false)
    }
  }, [coupon, isFirstLoad])

  return (
    <EditCouponDrawerForm
      ref={formRef}
      visible={visible}
      discountType={currentTypeSelected}
      loading={loadingCouponCreation}
      close={closeDrawer}
      onSubmit={handleFormSubmit}
      changeDiscountType={changeDiscountType}
      loadOptions={handleGetProductOptions}
    />
  )
}

export { EditCoupon }
