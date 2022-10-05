import { FormHandles } from '@unform/core'
import { RefObject, useState } from 'react'
import { IStreamingRoom } from '../../../../../domain/models/streamingRoom'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'
import { formatDate, formatTime, KTSVG } from '../../../../../helpers'
import { dateMask } from '../../../../formatters/dateFormatter'
import { ErrorMandatoryItem } from '../../../errors/errorMandatoryItem'
import { DatePicker, Select } from '../../../inputs'
import { Row } from './row'

type props = {
  formRef: RefObject<FormHandles>
  streamingRoomArray: IStreamingRoom[]
  zoomUsersOptions: ISelectOption[]

  idDeletedStreamingRoom: string[]
  streamRoomUpdate: IStreamingRoom[]
}

export default function RoomInternalTable({
  formRef,
  streamingRoomArray,
  zoomUsersOptions,
  idDeletedStreamingRoom,
  streamRoomUpdate,

}: props) {
  const [refresher, setRefresher] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')

  const handleRefresher = () => {
    setRefresher(!refresher)
  }

  async function handleStreamingRoomSubmit() {
    const streamingDate = formRef?.current?.getData().streamingDate
    const streamingHour = formRef?.current?.getData().streamingHour
    const zoomUserId = formRef?.current?.getData().zoomUserId

    if (streamingDate && streamingHour && zoomUserId) {
      const formattedStreamingHour = formatTime(streamingHour, 'HH:mm')

      const streaming = {
        date: formatDate(streamingDate, 'YYYY-MM-DD'),
        hour: formattedStreamingHour,
        start: false,      
      }
      streamingRoomArray.push(streaming)
      streamRoomUpdate.push(streaming)
      formRef.current?.clearField('streamingDate')
      formRef.current?.clearField('streamingHour')
  
      handleRefresher()
    } else {
      setHasError(true)
      setMessageError('Você precisa preencher todos os campos')
    }
  }

  return (
    <>
      {hasError && (
        <ErrorMandatoryItem
          mainMessage='Não é possível adicionar streaming!'
          secondaryMessage={messageError}
          setHasError={setHasError}
        />
      )}

      <div className='d-flex flex-row align-middle gap-5'>
        <div className='col-3'>
         <Select name='zoomUserId' label='Usuário do Zoom' defaultValue= ''>
              <option disabled value=''>
                Selecione
              </option>
              {zoomUsersOptions?.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
          </Select>
        </div>

        <DatePicker
          name='streamingDate'
          label='Dia da transmissão'
          placeholderText='00/00/0000'
          autoComplete='off'
          mask='99/99/9999'
          minDate={new Date()}
          minYearAmount={0}
        />
        <DatePicker
          name='streamingHour'
          label='Horário'
          placeholderText='00:00'
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption='Horas'
          dateFormat='HH:mm'
          autoComplete='off'
          mask='99:99'
        />

        <div className='fv-row d-flex align-items-center mt-3'>
          <button
            type='button'
            onClick={handleStreamingRoomSubmit}
            className='btn btn-sm btn-primary'
          >
            <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
            Adicionar Data
          </button>
        </div>
      </div>

      {streamingRoomArray?.length > 0 && (
        <div className='card mb-5 mb-xl-8'>
          <div className='py-3 float-start'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th className='text-dark ps-4 min-w-200px rounded-start'>
                      Data de Transmissão
                    </th>
                    <th className='text-dark min-w-200px'>Horário de Início </th>
                    <th className='text-dark min-w-150px'>Iniciar</th>
                    <th className='text-dark min-w-80px text-start rounded-end'>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {streamingRoomArray?.map((item, index) => (
                    <Row
                      key={index}
                      index={index}
                      liveDate={dateMask(item.date)}
                      time={item.hour}
                      start={item.showStartLink}
                      startUrl={item.startUrl}
                      streamingRoomArray={streamingRoomArray}
                      idDeletedStreamingRoom={idDeletedStreamingRoom}
                      streamRoomUpdate={streamRoomUpdate}
                      handleRefresher={handleRefresher}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
