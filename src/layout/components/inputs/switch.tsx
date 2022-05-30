import { useState } from "react"
import { ActionModal } from "../modals/action"



export function Switch({ id, active }: any) {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [isActive, setIsActive] = useState(active);  

  async function handleUpdateCourse() {
    // try {
    //   await props.deleteCourse.delete(props.id)
    //   setIsModalDeleteOpen(false)
    //   toast.success("Curso atualizado com sucesso.")
    //   props.handleRefresher()
    // } catch (err) {
    //        toast.error("Não foi possível atualizar o curso.")
    // }
  }
  return (
    <>
    <div className='d-block'>
      <div className='form-check form-switch form-switch-sm form-check-custom'>
        <input  onClick={() => {
             setIsModalUpdateOpen(true)
         }} 
          className='form-check-input'
          type='checkbox'
          id = {id}
          checked={isActive}         
        />
       </div>
    </div>

      <ActionModal
      isOpen={isModalUpdateOpen}
      modalTitle = "Confirmação"
      message = "Você tem certeza que deseja alterar o status deste curso?"
      action={handleUpdateCourse}
      onRequestClose={() => {
        setIsModalUpdateOpen(false)
      }}
      />
      </>
  )
}
