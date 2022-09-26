import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'

import { usePagination } from '../../../application/hooks/usePagination'
import { useRequest } from '../../../application/hooks/useRequest'
import { KTSVG } from '../../../helpers'
import { debounce } from '../../../helpers/debounce'

import { Search } from '../../components/search/Search'
import { CouponsTable } from '../../components/tables/coupons-list'

import { toast } from 'react-toastify'
import { ICoupon } from '../../../domain/models/coupon'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import {
  ICreateCoupon,
  IDeleteCoupon,
  IDeleteCouponParams,
  IGetCoupons,
  IGetCouponsParams,
  IUpdateCoupon,
} from '../../../domain/usecases/interfaces/coupon'
import {
  IToggleCouponStatus,
  IToggleCouponStatusParams,
} from '../../../domain/usecases/interfaces/coupon/toggleCouponStatus'
import { IGetAllAvailableProducts } from '../../../domain/usecases/interfaces/product/getAllAvailableProducts'
import ConfirmationModal from '../../components/modal/ConfirmationModal'
import { CreateCoupon } from './createCoupon'
import { EditCoupon } from './editCoupon'
import { IDisableCoupon, IDisableCouponParams } from '../../../domain/usecases/interfaces/coupon/disableCoupon'

type CouponsTemplateProps = {
  remoteGetCoupons: IGetCoupons
  remoteCreateCoupon: ICreateCoupon
  remoteUpdateCoupon: IUpdateCoupon
  remoteDeleteCoupon: IDeleteCoupon
  remoteToggleCouponStatus: IToggleCouponStatus
  remoteGetAllAvailableProducts: IGetAllAvailableProducts
  remoteDisableCoupon: IDisableCoupon
}

export function CouponsTemplate({
  remoteGetCoupons,
  remoteCreateCoupon,
  remoteUpdateCoupon,
  remoteDeleteCoupon,
  remoteToggleCouponStatus,
  remoteGetAllAvailableProducts,
  remoteDisableCoupon
}: CouponsTemplateProps) {
  const paginationHook = usePagination()

  const searchCouponFormRef = useRef<FormHandles>(null)

  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage, order } = pagination

  const [coupons, setCoupons] = useState<ICoupon[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null)
  const [couponName, setCouponName] = useState('')
  const [couponToToggleStatus, setCouponToToggleStatus] = useState<string | null>(null)
  const [couponTobeDeleted, setCouponTobeDeleted] = useState<string | null>(null)
  const [couponToDisable, setCouponToDisable] = useState<string | null>(null)

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const paginationParams: IGetCouponsParams = {
    page: currentPage,
    take,
    name: couponName,
    orderBy: pagination.orderBy,
    order,
    allRecords: true,
  }

  const {
    makeRequest: getCoupons,
    error: getCouponsError,
    data: paginatedCoupons,
  } = useRequest<OutputPagination<ICoupon>, IGetCouponsParams>(remoteGetCoupons.get)

  const {
    makeRequest: toggleCouponStatus,
    data: toggleCouponStatusSuccessful,
    loading: toggleStatusLoading,
    cleanUp: cleanUpToggleCouponStatus,
    error: toggleStatusError,
  } = useRequest<IToggleCouponStatusParams>(remoteToggleCouponStatus.toggle)

  const {
    makeRequest: deleteCoupon,
    data: couponDeleteSuccessful,
    loading: deleteCouponStatus,
    cleanUp: deleteCouponcleanUp,
    error: deleteCouponError,
  } = useRequest<IDeleteCouponParams>(remoteDeleteCoupon.delete)

  const {
    makeRequest: disableCoupon,
    data: couponDisableSuccessful,
    loading: disableStatus,
    cleanUp: disableCleanUp,
    error: disableError,
  } = useRequest<IDisableCouponParams>(remoteDisableCoupon.disable)

  const handleSearchCoupon = debounce((text: string) => {
    setCouponName(text)
  })

  const handleOpenModalCreateCoupon = () => {
    setIsModalCreateOpen(true)
  }

  const handleCloseModalCreateCoupon = () => {
    setIsModalCreateOpen(false)
  }

  const handleToggleCouponStatus = (id: string) => {
    setCouponToToggleStatus(id)
  }

  const handleConfirmationToggleStatus = () => {
    if (couponToToggleStatus) {
      toggleCouponStatus({ id: couponToToggleStatus })
    }
  }

  const handleCloseModalToToggleStatus = () => {
    setCouponToToggleStatus(null)
  }

  const handleCouponToBeDisabled = (id: string) => {
    setCouponToDisable(id)
  }

  const handleDisableCoupon = () => {
    if (couponToDisable) {
      disableCoupon({ id: couponToDisable })
    }
  }

  const handleCloseModalToConfirmDisable = () => {
    setCouponToDisable(null)
  }

  const handleCouponToBeDeleted = (id: string) => {
    setCouponTobeDeleted(id)
  }

  const handleDeleteCoupon = () => {
    if (couponTobeDeleted) {
      deleteCoupon({ id: couponTobeDeleted })
    }
  }

  const handleCloseModalToConfirmDeletion = () => {
    setCouponTobeDeleted(null)
  }

  const handleSelectCouponToBeEdited = (coupon: ICoupon) => {
    setSelectedCoupon(coupon)
  }

  const handleRemoveSelectedCouponToBeEdited = () => {
    setSelectedCoupon(null)
  }

  useEffect(() => {
    getCoupons(paginationParams)
  }, [
    pagination.take,
    pagination.totalPages,
    pagination.order,
    pagination.orderBy,
    couponName,
    currentPage,
    isModalCreateOpen,
    toggleCouponStatusSuccessful,
    couponDeleteSuccessful,
    selectedCoupon,
    couponDisableSuccessful
  ])

  useEffect(() => {
    if (paginatedCoupons) {
      const { data, total } = paginatedCoupons
      setTotalPage(total)
      setCoupons(data)
      return
    }

    if (toggleCouponStatusSuccessful) {
      handleCloseModalToToggleStatus()
      cleanUpToggleCouponStatus()
      toast.success(
        `Cupom ${
          !coupons.find((coupon) => coupon.id === couponToToggleStatus)?.isActive
            ? 'ativado'
            : 'desativado'
        } com sucesso.`
      )
      return
    }

    if (couponDeleteSuccessful) {
      toast.success('Cupom excluído com sucesso')
      handleCloseModalToConfirmDeletion()
      deleteCouponcleanUp()
    }

    if (couponDisableSuccessful) {
      toast.success('Cupom excluído com sucesso')
      handleCloseModalToConfirmDisable()
      disableCleanUp()
    }
  }, [toggleCouponStatusSuccessful, paginatedCoupons, couponDeleteSuccessful, couponDisableSuccessful])

  useEffect(() => {
    if (getCouponsError) {
      toast.error(getCouponsError)
      return
    }

    if (toggleStatusError) {
      toast.error(toggleStatusError)
      cleanUpToggleCouponStatus()
    }

    if (deleteCouponError) {
      toast.error(deleteCouponError)
      deleteCouponcleanUp()
    }
  }, [getCouponsError, toggleStatusError])

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

        <CouponsTable
          coupons={coupons}
          paginationHook={paginationHook}
          toggleCouponStatus={handleToggleCouponStatus}
          deleteCoupon={handleCouponToBeDeleted}
          selectCouponToBeEdited={handleSelectCouponToBeEdited}
          disableCoupon={handleCouponToBeDisabled}
        />
      </div>

      <CreateCoupon
        visible={isModalCreateOpen}
        close={handleCloseModalCreateCoupon}
        remoteCreateCoupon={remoteCreateCoupon}
        remoteGetAllAvailableProducts={remoteGetAllAvailableProducts}
      />

      <EditCoupon
        coupon={selectedCoupon}
        visible={!!selectedCoupon}
        close={handleRemoveSelectedCouponToBeEdited}
        remoteUpdateCoupon={remoteUpdateCoupon}
        remoteGetAllAvailableProducts={remoteGetAllAvailableProducts}
      />

      <ConfirmationModal
        isOpen={!!couponToToggleStatus}
        content='Você tem certeza que deseja alterar o status deste cupom?'
        loading={deleteCouponStatus}
        onRequestClose={handleCloseModalToToggleStatus}
        onConfimation={handleConfirmationToggleStatus}
        title='Confirmação'
      />

      <ConfirmationModal
        isOpen={!!couponToDisable}
        content='Você tem certeja que deseja excluir este cupom?'
        loading={toggleStatusLoading}
        onRequestClose={handleCloseModalToConfirmDisable}
        onConfimation={handleDisableCoupon}
        title='Deletar'
      />
    </>
  )
}
