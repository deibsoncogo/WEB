import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'

import { usePagination } from '../../../application/hooks/usePagination'
import { useRequest } from '../../../application/hooks/useRequest'
import { KTSVG } from '../../../helpers'
import { debounce } from '../../../helpers/debounce'

import { Search } from '../../components/search/Search'
import { CouponsTable } from '../../components/tables/coupons-list'

import { ICoupon } from '../../../domain/models/coupon'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import {
  ICreateCoupon,
  IDeleteCoupon,
  IGetCoupons,
  IGetCouponsParams,
  IUpdateCoupon,
} from '../../../domain/usecases/interfaces/coupon'
import { CreateCoupon } from './createCoupon'

type CouponsTemplateProps = {
  remoteGetCoupons: IGetCoupons
  remoteCreateCoupon: ICreateCoupon
  remoteUpdateCoupon: IUpdateCoupon
  remoteDeleteCoupon: IDeleteCoupon
}

export function CouponsTemplate({
  remoteGetCoupons,
  remoteCreateCoupon,
  remoteUpdateCoupon,
  remoteDeleteCoupon,
}: CouponsTemplateProps) {
  const paginationHook = usePagination()

  const searchCouponFormRef = useRef<FormHandles>(null)

  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage, order } = pagination

  const [coupons, setCoupons] = useState<ICoupon[]>([])
  const [couponName, setCouponName] = useState('')

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const paginationParams: IGetCouponsParams = {
    page: currentPage,
    take,
    name: couponName,
    order,
  }

  const {
    makeRequest: getCoupons,
    error: getCouponsError,
    data: paginatedCoupons,
  } = useRequest<OutputPagination<ICoupon>, IGetCouponsParams>(remoteGetCoupons.get)

  const handleSearchCoupon = debounce((text: string) => {
    setCouponName(text)
  })

  const handleOpenModalCreateCoupon = () => {
    setIsModalCreateOpen(true)
  }
  const handleCloseModalCreateCoupon = () => {
    setIsModalCreateOpen(false)
  }

  useEffect(() => {
    getCoupons(paginationParams)
  }, [
    pagination.take,
    pagination.totalPages,
    pagination.order,
    pagination.orderBy,
    currentPage,
    isModalCreateOpen,
  ])

  useEffect(() => {
    if (paginatedCoupons) {
      const { data, total } = paginatedCoupons
      setTotalPage(total)
      setCoupons(data)
    }
  }, [paginatedCoupons])

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search ref={searchCouponFormRef} onChangeText={handleSearchCoupon} />
          </h3>
          <div className='card-toolbar' onClick={handleOpenModalCreateCoupon}>
            <button className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Novo Cupom
            </button>
          </div>
        </div>

        <CouponsTable coupons={coupons} paginationHook={paginationHook} />
      </div>

      <CreateCoupon
        visible={isModalCreateOpen}
        close={handleCloseModalCreateCoupon}
        remoteCreateCoupon={remoteCreateCoupon}
      />
    </>
  )
}
