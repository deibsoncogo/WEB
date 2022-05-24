import Link from 'next/link'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import { dateMask } from '../../../formatters/dateFormatter'
import { cpfMask } from '../../../formatters/cpfFormatter'
import { addressMask } from '../../../formatters/addressFormatter'
//import { IGetAllCourses } from '../../../../domain/usecases/interfaces/user/getAllCourses'
import { IUserResponse } from '../../../../interfaces/api-response'
import { useEffect, useState } from 'react'
import { RiFileExcel2Line } from 'react-icons/ri'
import { MakeUserRow } from '../../../../application/factories/components/deleteModal-factory'
import { MakeCourseRow } from '../../../../application/factories/components/course/rowCourse-factory'

// type Props = {
//   getAllCourses: IGetAllCourses
// }

export default function CoursesTable({ getAllCourses }: any) {
  const [Courses, setCourses] = useState<IUserResponse[]>([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)

  //setLoading(false)
  const fakeCourse = [{id: "1", name: "Day Trade Básico", description: "Curso de extensão", 
                    price: "R$ 1.200,00", discount: "R$ 200", teacher: "Palex", active: "ativo" }]

//   useEffect(() => {
//     getAllCourses
//       .getAll()
//       .then((data) => {
//         setCourses(data)
//       })
//       .catch((error) => setError(error))
//       .finally(() => setLoading(false))
//   }, [])

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <Search />
        </h3>
        <div className='card-toolbar'>
          <Link href='/Courses/create'>
            <a className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Novo Curso
            </a>
          </Link>
        </div>
      </div>

      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='text-dark ps-4 min-w-100px rounded-start'>Nome</th>
                <th className='text-dark min-w-150px'>Descrição</th>
                <th className='text-dark min-w-100px'>Preço</th>
                <th className='text-dark min-w-100px'>Desconto</th>
                <th className='text-dark min-w-100px'>Professor</th>
                <th className='text-dark min-w-50px'>Ativo</th>
                <th className='text-dark min-w-150px text-end rounded-end' />
              </tr>
            </thead>

            { <tbody>
              {loading &&
                fakeCourse?.map((item) => (
                  <MakeCourseRow
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    discount={item.discount}
                    teacher={item.teacher}
                    active={item.active}
                  />
                ))}
            </tbody>}
          </table>
        </div>
      </div>

      <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
      
        <div className='card-toolbar'>
          <ul className='pagination'>
            <li className='page-item previous disabled'>
              <a href='#' className='page-link'>
                <i className='previous'></i>
              </a>
            </li>
            <li className='page-item'>
              <a href='#' className='page-link'>
                1
              </a>
            </li>
            <li className='page-item active'>
              <a href='#' className='page-link'>
                2
              </a>
            </li>
            <li className='page-item'>
              <a href='#' className='page-link'>
                3
              </a>
            </li>
            <li className='page-item next'>
              <a href='#' className='page-link'>
                <i className='next'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
