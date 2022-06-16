import { Loading } from '../../loading/loading'
import { Pagination } from '../../pagination/Pagination'
import { usePaginationType } from '../../../../application/hooks/usePagination'
import { MakeTrainingsRow } from '../../../../application/factories/components/rows/trainingsRow'

type TrainingsTable = {
  loading: boolean
  trainings: ITrainings[]
  paginationHook: usePaginationType
  getTrainings(): Promise<void>
  handleRefresher: () => void
}

export function TrainingsTable({
  loading,
  trainings,
  paginationHook,
  getTrainings,
  handleRefresher,
}: TrainingsTable) {
  return (
    <>
      {trainings.length !== 0 && (
        <>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th className='text-dark ps-4 min-w-100px rounded-start'>Nome</th>
                    <th className='text-dark min-w-100px'>Descrição</th>
                    <th className='text-dark min-w-100px'>Preço</th>
                    <th className='text-dark min-w-150px'>Professor</th>
                    <th className='text-dark min-w-100px'>Chat</th>
                    <th className='text-dark min-w-100px'>Ativo</th>
                    <th className='text-dark min-w-50px text-end rounded-end' />
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    trainings?.map((item) => (
                      <MakeTrainingsRow
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        teacher={item.teacher}
                        active={item.active}
                        getTrainings={getTrainings}
                        handleRefresher={handleRefresher}
                      />
                    ))}
                </tbody>
              </table>
            </div>

            {loading && <Loading />}
          </div>
          <div className='ms-auto'>
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
