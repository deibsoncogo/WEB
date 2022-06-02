import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { IDeleteCourse } from '../../../../domain/usecases/interfaces/course/deleteCourse'
import { KTSVG } from '../../../../helpers'
import { Switch } from '../../inputs/switch'
import { ActionModal } from '../../modals/action'
import { IGetCourse } from '../../../../domain/usecases/interfaces/course/getCourse'
import { IUpdateCourse } from '../../../../domain/usecases/interfaces/course/upDateCourse'
import { Tooltip} from "@nextui-org/react";

interface IRow {
  id: string
  name: string
  description: string
  price: string
  discount: string
  teacher: string
  active: boolean
  deleteCourse: IDeleteCourse
  updateCourse: IUpdateCourse
  getCourse: IGetCourse
  handleRefresher: () => void; 
}

export function Row(props: IRow) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    
  async function handleDeleteCourse() {
    try {
      await props.deleteCourse.delete(props.id)
      setIsModalDeleteOpen(false)
      toast.success("Curso deletado com sucesso.")
      props.handleRefresher()
    } catch (err) {
           toast.error("Não foi possível deletear o curso.")
    }
  }

  
  return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{props.name}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{props.description}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{props.price}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{props.discount}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{props.teacher}</span>
        </td>
        <td>
          <Switch
            updateCourse={props.updateCourse}
            getCourse={props.getCourse}
            active={props.active}
            id={props.id}
          />
        </td>
        <td className='text-end'>
          <Tooltip content={'Editar'} rounded css={{ color: '$customColor' }}>
            <Link href={`/courses/edit/${props.id}`}>
              <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
              </button>
            </Link>
          </Tooltip>
          <Tooltip content={'Deletar'} rounded css={{ color: '$customColor' }}>
            <button
              onClick={() => {
                setIsModalDeleteOpen(true)
              }}
              className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
            >
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </button>
          </Tooltip>
        </td>

        <ActionModal
          isOpen={isModalDeleteOpen}
          modalTitle='Deletar'
          message='Você tem certeza que deseja excluir este curso?'
          action={handleDeleteCourse}
          onRequestClose={() => {
            setIsModalDeleteOpen(false)
          }}
        />
      </tr>
    </>
  )
}
