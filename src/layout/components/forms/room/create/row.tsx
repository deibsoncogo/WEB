import { Tooltip } from '@nextui-org/react'
import { CourseClass } from '../../../../../domain/models/courseClass'
import { KTSVG } from '../../../../../helpers'

interface IRow {
  name: string
  link: string
  displayOrder: number
  classCourse: CourseClass
  courseClassArray: CourseClass[]
  handleRefresher: () => void
}

export function Row(props: IRow) {
  const deleteClass = () => {
    const index = props.courseClassArray.indexOf(props.classCourse, 0)
    if (index > -1) {
      props.courseClassArray.splice(index, 1)
    }
    props.handleRefresher()
  }

  return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{props.name}</span>
        </td>

        <td>
          <span className='text-dark fw-bold d-block fs-7'>{props.link}</span>
        </td>

        <td>
          <span className='text-dark fw-bold d-block fs-7 text-center'>{props.displayOrder}</span>
        </td>

        <td className = 'text-center'>
          <Tooltip content={'Deletar'} rounded color='primary'>
            <a
              onClick={() => {
                deleteClass()
              }}
              className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
            >
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </a>
          </Tooltip>
        </td>
      </tr>
    </>
  )
}
