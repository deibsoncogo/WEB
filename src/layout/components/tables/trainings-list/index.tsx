import { MakeTrainingsRow } from '../../../../application/factories/components/rows/trainingsRow'
import { usePaginationType } from '../../../../application/hooks/usePagination'
import { ITraining } from '../../../../domain/models/training'
import { Pagination } from '../../pagination/Pagination'

type ITrainingsTable = {
  trainings: ITraining[]
  paginationHook: usePaginationType
  handleRefresher: () => void
  openToggleStatusConfirmationModal: (trainingId: string) => void
  isAdmin: boolean
}

export function TrainingsTable({
  trainings,
  paginationHook,
  handleRefresher,
  openToggleStatusConfirmationModal,
  isAdmin,
}: ITrainingsTable) {
  const { getClassToCurrentOrderColumn, handleOrdenation } = paginationHook

  const getColumnHeaderClasses = (name: string) => {
    return `text-dark ps-4 min-w-100px cursor-pointer ${getClassToCurrentOrderColumn(name)}`
  }

  return (
    <>
      {trainings.length !== 0 && (
        <>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-2 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={getColumnHeaderClasses('name') + ' rounded-start'}
                      onClick={() => handleOrdenation('name')}
                    >
                      Nome
                    </th>
                    <th
                      className={getColumnHeaderClasses('description')}
                      onClick={() => handleOrdenation('description')}
                    >
                      Descrição
                    </th>
                    <th
                      className={getColumnHeaderClasses('price')}
                      onClick={() => handleOrdenation('price')}
                    >
                      Preço
                    </th>
                    <th
                      className={getColumnHeaderClasses('teacher')}
                      onClick={() => handleOrdenation('teacher')}
                    >
                      Professor
                    </th>
                    <th className='text-dark min-w-100px'>Chat</th>
                    <th
                      className={getColumnHeaderClasses('isActive')}
                      onClick={() => handleOrdenation('isActive')}
                    >
                      Ativo
                    </th>
                    <th
                      className='text-dark min-w-50px text-end rounded-end'
                      style={{ verticalAlign: 'middle', paddingRight: '3.8rem' }}
                    >
                      Ação
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {trainings?.map((item) => (
                    <MakeTrainingsRow
                      key={item.id}
                      id={String(item.id)}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      teacher={item.teacher}
                      belongsToPlans={item.belongsToPlans}
                      isActive={item.isActive}
                      handleRefresher={handleRefresher}
                      handleToggleStatusConfirmation={openToggleStatusConfirmationModal}
                      isAdmin={isAdmin}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
            <Pagination paginationHook={paginationHook} />
          </div>
        </>
      )}
      {trainings.length === 0 && (
        <div className='py-14 border mx-4 my-8 d-flex'>
          <p className='text-center w-100 m-0 font-weight-bold'>
            <span className='text-danger'>Ops! 😅 </span>
            Nenhum treinamento encontrado
          </p>
        </div>
      )}
    </>
  )
}
