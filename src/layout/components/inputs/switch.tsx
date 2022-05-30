import { useState } from "react"
import { toast } from "react-toastify"
import { UpdateCourse } from "../../../domain/models/updateCourse"
import { IGetCourse } from "../../../domain/usecases/interfaces/course/getCourse"
import { IUpdateCourse } from "../../../domain/usecases/interfaces/course/upDateCourse"
import { ActionModal } from "../modals/action"

interface ISwitch {
  active: boolean
  updateCourse: IUpdateCourse
  getCourse: IGetCourse
  id: string
  
}

export function Switch(props: ISwitch) {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [isActive, setIsActive] = useState(props.active);  

  async function handleUpdateCourse() {
     try {
       const course = await props.getCourse.get(props.id)       
      
       const courseUpdate = new UpdateCourse(course.id, course.name, course. description, course.content,
       course.categoryId, parseFloat(course.discount), course.image,  parseInt(course.installments), !isActive,  parseFloat(course.price), course.userId)
       await props.updateCourse.update(courseUpdate);     
       setIsModalUpdateOpen(false)
       setIsActive(!isActive)
       toast.success("Curso atualizado com sucesso.")
       } catch (err) {
       toast.error("Não foi possível atualizar o curso.")
    }
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
