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
import { UpdateCourse } from '../../../../domain/models/updateCourse'
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
  updateCourse: IUpdateCourse
  handleRefresher: () => void; 
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
      toast.success("Curso deletado com sucesso.")
      props.handleRefresher()
    } catch{
           toast.error("Não foi possível deletar o curso.")
    }
    finally{
      setLoading(false)
    }
  }

  async function handleUpdateCourse() {
    try {
   
      const form = new FormData()
      form.append('course', JSON.stringify({id: props.id, isActive: !isActive}))
      setLoading(true)
      await props.updateCourse.update(form)
      setIsModalUpdateOpen(false)
      setIsActive(!isActive)      
      toast.success('Curso atualizado com sucesso.')
    } catch (err) {
      toast.error('Não foi possível atualizar o curso.')
    }
    finally{
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
          <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom' title={props.description}>{props.description}</span>
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
            active={isActive}         
            setModalUpdate={setIsModalUpdateOpen}
          />
        </td>
        <td className='text-end d-flex justify-content-start px-4'>
          <Tooltip content={'Editar'} rounded color = "primary">
            <Link href={`/courses/edit/${props.id}`}>
              <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
              </button>
            </Link>
          </Tooltip>
          <Tooltip content={props.belongsToPlans ? 'Não é possível deletar, pois pertence a um plano' : 'Deletar'} rounded color = "primary">
            <button
              onClick={props.belongsToPlans ? undefined : () => {
                setIsModalDeleteOpen(true)
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
            >
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </button>
          </Tooltip>
        </td>
     
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        loading={loading}
        onRequestClose={() => {
          setIsModalDeleteOpen(false)
        }}
        onConfimation={handleDeleteCourse}
        content='Você tem ceterza que deseja excluir este curso?'
        title='Deletar'
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
