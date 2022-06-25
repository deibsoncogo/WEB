import { IStreaming } from '../../../../domain/models/streaming'
import { Row } from './row'

interface IStreamingTable {
  streamList: IStreaming[]
  removeStreamItem: (index: number) => void
}

export function StreamingTable({ streamList, removeStreamItem }: IStreamingTable) {
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
                  liveDate={item.date}
                  time={item.hour}
                  start={item.showStartLink}
                  startUrl={item.startUrl as string}
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
