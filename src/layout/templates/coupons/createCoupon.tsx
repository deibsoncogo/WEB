import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { ICoupon } from '../../../domain/models/coupon'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { CreateCouponParams, ICreateCoupon } from '../../../domain/usecases/interfaces/coupon'
import { IGetAllAvailableProducts } from '../../../domain/usecases/interfaces/product/getAllAvailableProducts'
import { formatDate } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { getOptionsFromSearchRequest } from '../../../utils/getOptionsFromSearchRequest'
import { CreateCouponDrawerForm } from '../../components/forms/coupons/create'
import { onlyNums } from '../../formatters/currenceFormatter'
import { couponFormSchema, IDiscountType } from './type'
import { extractFormattedProductOptions } from './utils/extractFormattedOptions'
import { getProductErrorMessageCoupon } from './utils/getProductErrorMessageCoupon'

type Props = {
  visible: boolean
  close: () => void
  remoteCreateCoupon: ICreateCoupon
  remoteGetAllAvailableProducts: IGetAllAvailableProducts
}

const CreateCoupon = ({
  remoteCreateCoupon,
  remoteGetAllAvailableProducts,
  visible,
  close,
}: Props) => {
  const [currentTypeSelected, setCurrentTypeSelected] = useState<IDiscountType>('percentage')
  const [defaultProductsOptions, setDefaultProductsOptions] = useState<ISelectOption[]>([])
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
      value:
        currentTypeSelected === 'value'
          ? Number(onlyNums(data.value))
          : Number(String(data.value).replace('%', '')),
    })

    if (!!error) {
      formRef?.current?.setErrors(error)
      return
    }

    if (success) {
      success.expirationDate = formatDate(new Date(data.expirationDate), 'YYYY-MM-DD')
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

  async function handleGetProductOptions(searchValue: string): Promise<ISelectOption[]> {
    const productOptionHasType = true
    return getOptionsFromSearchRequest({
      request: remoteGetAllAvailableProducts.getAll,
      search: {
        name: searchValue || '',
        allRecords: true,
      },
      hasType: productOptionHasType,
    })
  }

  const handlePopulateSelectInputs = async () => {
    const productOptionHasType = true

    const options = await getOptionsFromSearchRequest({
      request: remoteGetAllAvailableProducts.getAll,
      search: {
        name: '',
        allRecords: true,
      },
      hasType: productOptionHasType,
    })

    const formated = extractFormattedProductOptions(options)
    setDefaultProductsOptions(formated)
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
      const isValueProductError = String(createCouponError).includes(
        'product value less than discount:'
      )

      if (isValueProductError) {
        const productName = getProductErrorMessageCoupon(createCouponError)
        formRef.current?.setErrors({
          productsId: `O Produto ${productName} tem o valor menor que o valor do desconto`,
        })
        return
      }
      toast.error(createCouponError)
      cleanUpCreateCoupon()
    }
  }, [createCouponError])

  useEffect(() => {
    handlePopulateSelectInputs()
  }, [])

  return (
    <CreateCouponDrawerForm
      ref={formRef}
      visible={visible}
      discountType={currentTypeSelected}
      loading={loadingCouponCreation}
      close={closeDrawer}
      onSubmit={handleFormSubmit}
      changeDiscountType={changeDiscountType}
      productOptions={defaultProductsOptions}
      defaultOptions={defaultProductsOptions}
      loadOptions={handleGetProductOptions}
    />
  )
}

export { CreateCoupon }
