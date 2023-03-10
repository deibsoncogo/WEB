import { usePaginationType } from '../../../../application/hooks/usePagination'
import { IPlan } from '../../../../domain/models/plan'
import { ITogglePlanStatusParams } from '../../../../domain/usecases/interfaces/plan/togglePlanStatus'
import { Pagination } from '../../pagination/Pagination'
import { FreePlanTableRow } from './row'

type PlansTableProps = {
  freePlans: IPlan[]
  paginationHook: usePaginationType
  togglePlanStatus: (params: ITogglePlanStatusParams) => void
  onDeleteFreePlan: (freePlanId: string) => void
}

type HandleClassesParam = {
  title: string
  extraClases?: string
}

export function FreePlansTable({
  freePlans = [],
  paginationHook,
  togglePlanStatus,
  onDeleteFreePlan,
}: PlansTableProps) {
  const { getClassToCurrentOrderColumn, handleOrdenation } = paginationHook

  const getColumnHeaderClasses = ({ title, extraClases = '' }: HandleClassesParam) => {
    return `text-dark ps-4 cursor-pointer cursor-pointer align-middle min-w-150px ${extraClases} ${getClassToCurrentOrderColumn(
      title
    )}`
  }

  return (
    <>
      <div className='card-body py-3'>
        <div className='table-responsive w-100'>
          <table className='table gs-2 gy-4 w-100'>
            <thead>
              <tr className='fw-bolder text-muted bg-light '>
                <th
                  role='columnheader'
                  scope='col'
                  className={getColumnHeaderClasses({ title: 'name' }) + ' rounded-start'}
                  onClick={() => handleOrdenation('name')}
                >
                  Nome
                </th>
                <th
                  role='columnheader'
                  scope='col'
                  className={getColumnHeaderClasses({ title: 'description' })}
                  onClick={() => handleOrdenation('description')}
                >
                  Descrição
                </th>
                <th
                  role='columnheader'
                  scope='col'
                  className={getColumnHeaderClasses({ title: 'intervalAccess' })}
                  style={{ maxWidth: '130px' }}
                  onClick={() => handleOrdenation('intervalAccess')}
                >
                  Acesso ao Conteúdo (dias)
                </th>
                <th
                  className={getColumnHeaderClasses({ title: 'isActive' })}
                  onClick={() => handleOrdenation('isActive')}
                >
                  Ativo
                </th>
                <th
                  className='text-dark text-end rounded-end align-middle'
                  style={{ verticalAlign: 'middle', paddingRight: '3rem' }}
                >
                  Ação
                </th>
              </tr>
            </thead>

            <tbody className='w-100'>
              {freePlans?.map((freePlan) => (
                <FreePlanTableRow
                  key={freePlan.id}
                  freePlan={freePlan}
                  togglePlanStatus={togglePlanStatus}
                  onDeleteFreePlan={onDeleteFreePlan}
                />
              ))}
            </tbody>
          </table>

          {freePlans.length === 0 && (
            <p className='text-center my-8 pt-2'>Nenhum plano encontrado</p>
          )}
        </div>
      </div>
      <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
        <Pagination paginationHook={paginationHook} />
      </div>
    </>
  )
}
