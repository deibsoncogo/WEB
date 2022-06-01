import { Row } from './row'

interface IStreamList {
  liveDate: string
  time: string
  start: boolean
}

interface ILivesTable {
  streamList: IStreamList[]
  removeStreamItem: (index: number) => void
}

export function LivesTable({ streamList, removeStreamItem }: ILivesTable) {
  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='py-3'>
        <div className='table-responsive'>
          <table className='table table-striped align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='text-dark ps-4 min-w-100px rounded-start'>Data de Transmissão</th>
                <th className='text-dark min-w-100px'>Horário de Início</th>
                <th className='text-dark min-w-100px'>Iniciar</th>
                <th className='text-dark min-w-50px text-end rounded-end' />
              </tr>
            </thead>

            <tbody>
              {streamList?.map((item, index) => (
                <Row
                  key={index}
                  index={index}
                  liveDate={item.liveDate}
                  time={item.time}
                  start={item.start}
                  removeStreamItem={removeStreamItem}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
