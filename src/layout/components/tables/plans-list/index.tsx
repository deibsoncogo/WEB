import { usePaginationType } from '../../../../application/hooks/usePagination'
import { IPlan } from '../../../../domain/models/plan'
import PlanTableRow from './row'

type PlansTableProps = {
  plans: IPlan[]
  paginationHook: usePaginationType
}

type HandleClassesParam = {
  title: string
  extraClases?: string
}

export function PlansTable({ plans = [], paginationHook }: PlansTableProps) {
  const { getClassToCurrentOrderColumn, handleOrdenation } = paginationHook

  const getColumnHeaderClasses = ({ title, extraClases = '' }: HandleClassesParam) => {
    return `text-dark ps-4 rounded-start cursor-pointer cursor-pointer align-middle min-w-150px ${extraClases} ${getClassToCurrentOrderColumn(
      title
    )}`
  }

  return (
    <>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4 datatable'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th
                  role='columnheader'
                  className={getColumnHeaderClasses({ title: 'name' })}
                  onClick={() => handleOrdenation('name')}
                >
                  Nome
                </th>
                <th
                  role='columnheader'
                  className={getColumnHeaderClasses({ title: 'description' })}
                  onClick={() => handleOrdenation('description')}
                >
                  Descrição
                </th>
                <th
                  role='columnheader'
                  className={getColumnHeaderClasses({ title: 'price' })}
                  onClick={() => handleOrdenation('price')}
                >
                  Preço
                </th>
                <th
                  role='columnheader'
                  className={getColumnHeaderClasses({
                    title: 'intervalPaymentMonths',
                  })}
                  style={{ maxWidth: '130px' }}
                  onClick={() => handleOrdenation('intervalPaymentMonths')}
                >
                  Intervalo de Pagamento (meses)
                </th>
                <th
                  role='columnheader'
                  className={getColumnHeaderClasses({ title: 'intervalAccessMonths' })}
                  style={{ maxWidth: '130px' }}
                  onClick={() => handleOrdenation('intervalAccessMonths')}
                >
                  Acesso ao Conteúdo (meses)
                </th>
                <th
                  className={getColumnHeaderClasses({ title: 'isActive' })}
                  onClick={() => handleOrdenation('isActive')}
                >
                  Ativo
                </th>
                <th className='text-dark rounded-end align-middle' style={{ minWidth: '100px' }}>
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className='w-100'>
              {plans?.map((plan) => (
                <PlanTableRow key={plan.id} plan={plan} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
