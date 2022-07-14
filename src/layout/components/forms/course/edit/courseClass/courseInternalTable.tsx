import { FormHandles } from '@unform/core'
import { Dispatch, RefObject, SetStateAction, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import { KTSVG } from '../../../../../../helpers'
import { ICourseClassResponse } from '../../../../../../interfaces/api-response/courseClassResponse'
import { Input } from '../../../../inputs'
import { arrayMove, List } from 'react-movable'

type prop = {
  courseClassArray: ICourseClassResponse[]
  setCourseClass: Dispatch<SetStateAction<ICourseClassResponse[]>>
  IdDeletedCourseClass: string[]
  formRef: RefObject<FormHandles>
}

export default function CoursesInternalTable({
  courseClassArray,
  setCourseClass,
  IdDeletedCourseClass,
  formRef,
}: prop) {
  const [name, setName] = useState<string>()
  const [link, setLink] = useState<string>()
  const [hasError, setHasError] = useState<boolean>(false)
  const [refresher, setRefresher] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')

  const handleRefresher = () => {
    setRefresher(!refresher)
  }

  const deleteClass = (courseClass: ICourseClassResponse) => {
    const index = courseClassArray.indexOf(courseClass, 0)
    if (index > -1) {
      courseClassArray.splice(index, 1)
      if (courseClass?.id) {
        IdDeletedCourseClass.push(courseClass.id)
      }
    }
    handleRefresher()
  }

  async function handleClassSubmit() {
    if (name && link) {
      if (
        !link.match(
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        )
      ) {
        setHasError(true)
        setMessageError('Link inválido e/ou ordem de exibição igual a 0 (zero)')
        return
      }
      const courseClass = { name, link }
      courseClassArray.push(courseClass)
      formRef.current?.clearField('nameClass')
      formRef.current?.clearField('link')
      handleRefresher()
    } else {
      setHasError(true)
      setMessageError('Você precisa preencher todos os campos')
    }
  }

  return (
    <>
      {hasError && (
        <div className='alert alert-danger d-flex alert-dismissible fade show' role='alert'>
          <strong>Não é possível adicionar aula!</strong>
          {messageError}.
          <button
            type='button'
            onClick={() => setHasError(false)}
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
          ></button>
        </div>
      )}

      <div className='d-flex flex-row align-middle gap-5'>
        <Input
          name='nameClass'
          label='Nome'
          type='text'
          onChange={(event) => setName(event.target.value)}
        />

        <Input
          name='link'
          label='Link'
          type='text'
          onChange={(event) => setLink(event.target.value)}
        />

        <div className='fv-row d-flex align-items-center mt-4'>
          <a onClick={handleClassSubmit} className='btn btn-sm btn-primary'>
            <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
            Adicionar aula
          </a>
        </div>
      </div>

      {courseClassArray.length > 0 && (
        <div className='card mb-5 mb-xl-8'>
          <div className='py-3 float-start'>
            <div className='table-responsive'>
              <List
                values={courseClassArray}
                onChange={({ oldIndex, newIndex }) => {
                  setCourseClass(arrayMove(courseClassArray, oldIndex, newIndex))
                }}
                renderList={({ children, props, isDragged }) => (
                  <table
                    style={{
                      cursor: isDragged ? 'grabbing' : undefined,
                    }}
                    className='table align-middle gs-0 gy-4'
                  >
                    <thead>
                      <tr className='fw-bolder text-muted bg-light'>
                        <th className='text-dark ps-4 min-w-200px rounded-start'>Nome</th>
                        <th className='text-dark min-w-200px'>Link</th>
                        <th className='text-dark min-w-100px text-end rounded-end' />
                      </tr>
                    </thead>
                    <tbody {...props}>{children}</tbody>
                  </table>
                )}
                renderItem={({ value, props, isDragged, isSelected }) => {
                  const row = (
                    <tr
                      {...props}
                      style={{
                        cursor: isDragged ? 'grabbing' : 'grab',
                        backgroundColor: isDragged || isSelected ? '#eee' : '#fafafa',
                      }}
                    >
                      <td className='ps-4'>
                        <span className='text-dark fw-bold d-block fs-7'>{value.name}</span>
                      </td>

                      <td>
                        <span className='text-dark fw-bold d-block fs-7'>{value.link}</span>
                      </td>

                      <td className='text-center'>
                        <Tooltip content={'Deletar'} rounded color='primary'>
                          <a
                            onClick={() => {
                              deleteClass(value)
                            }}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
                          </a>
                        </Tooltip>
                      </td>
                    </tr>
                  )
                  return isDragged ? (
                    <table style={{ ...props.style, borderSpacing: 0 }}>
                      <tbody>{row}</tbody>
                    </table>
                  ) : (
                    row
                  )
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
