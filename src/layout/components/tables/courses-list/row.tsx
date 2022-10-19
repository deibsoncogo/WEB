import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IDeleteCourse } from '../../../../domain/usecases/interfaces/course/deleteCourse'
import { IToggleCourseStatus } from '../../../../domain/usecases/interfaces/course/toggleCourseStatus'
import { KTSVG } from '../../../../helpers'
import { Switch } from '../../inputs/switch'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IRow {
  id: string
  name: string
  description: string
  price: string
  discount: string
  teacher: string
  active: boolean
  belongsToPlans: boolean
  deleteCourse: IDeleteCourse
  isAdmin: boolean
  toggleCourseStatus: IToggleCourseStatus
  handleRefresher: () => void
}

export function Row(props: IRow) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [isActive, setIsActive] = useState(props.active)
  const [loading, setLoading] = useState(false)

  async function handleDeleteCourse() {
    try {
      setLoading(true)
      await props.deleteCourse.delete(props.id)
      setIsModalDeleteOpen(false)
      toast.success('Curso excluído com sucesso!')
      props.handleRefresher()
    } catch {
      toast.error('Não foi possível excluir o curso!')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateCourse() {
    try {
      setLoading(true)
      await props.toggleCourseStatus.toggle({ id: props.id })
      setIsModalUpdateOpen(false)
      setIsActive(!isActive)
      toast.success(`Curso ${!isActive ? 'ativado' : 'desativado'} com sucesso!`)
    } catch (err) {
      toast.error('Não foi possível atualizar o curso!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{props.name}</span>
        </td>
        <td>
          <span
            className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'
            title={props.description}
          >
            {props.description}
          </span>
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
          <Switch active={isActive} setModalUpdate={setIsModalUpdateOpen} />
        </td>
        <td className='text-end d-flex justify-content-end px-4'>
          <Tooltip content={'Editar'} rounded color='primary'>
            <Link href={`/courses/edit/${props.id}`}>
              <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
              </button>
            </Link>
          </Tooltip>
          {props.isAdmin && (
            <Tooltip
              content={
                props.belongsToPlans
                  ? 'Não é possível excluir, pois pertence a um plano'
                  : 'Excluir'
              }
              rounded
              color='primary'
            >
              <button
                onClick={
                  props.belongsToPlans
                    ? undefined
                    : () => {
                        setIsModalDeleteOpen(true)
                      }
                }
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
              >
                <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
              </button>
            </Tooltip>
          )}
        </td>

        <ConfirmationModal
          isOpen={isModalDeleteOpen}
          loading={loading}
          onRequestClose={() => {
            setIsModalDeleteOpen(false)
          }}
          onConfimation={handleDeleteCourse}
          content='Você tem ceterza que deseja excluir este curso?'
          title='Excluir'
        />

        <ConfirmationModal
          isOpen={isModalUpdateOpen}
          loading={loading}
          onRequestClose={() => {
            setIsModalUpdateOpen(false)
          }}
          onConfimation={handleUpdateCourse}
          content='Você tem certeza que deseja alterar o status deste curso?'
          title='Confirmação'
        />
      </tr>
    </>
  )
}
