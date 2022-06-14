import Link from 'next/link'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import { useEffect, useRef, useState } from 'react'
import { GetCoursesParams, IGetAllCourses } from '../../../../domain/usecases/interfaces/course/getAllCourses'
import { IPartialCourseResponse } from '../../../../interfaces/api-response/coursePartialResponse'
import { currenceMask } from '../../../formatters/currenceFormatter'
import { toast } from 'react-toastify'
import { IDeleteCourse } from '../../../../domain/usecases/interfaces/course/deleteCourse'
import { Row } from './row'
import { IUpdateCourse } from '../../../../domain/usecases/interfaces/course/upDateCourse'
import { IGetCourse } from '../../../../domain/usecases/interfaces/course/getCourse'
import { Course } from '../../../../interfaces/model/Course'
import { debounce } from '../../../../helpers/debounce'
import { FormHandles } from '@unform/core'
import { usePagination } from '../../../../application/hooks/usePagination'
import { Pagination } from '../../pagination/Pagination'
import { Loading } from '../../loading/loading'
import { ItemNotFound } from '../../search/ItemNotFound'

type Props =  {
  getAllCourses: IGetAllCourses
  deleteCourse: IDeleteCourse
  updateCourse: IUpdateCourse
  getCourse: IGetCourse
}

export default function CoursesTable(props: Props) {

  const [courses, setCourses] = useState<IPartialCourseResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [refresher, setRefresher] = useState(true)

  const [courseName, setCourseName] = useState('')
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook
  
  const searchCourseFormRef = useRef<FormHandles>(null)


  function handleRefresher() {  
    setRefresher(!refresher);
  }

  const handleSearchCourse = debounce((text: string) => {    
    setCourseName(text)
  })

  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} rounded-start cursor-pointer ${getClassToCurrentOrderColumn(
      name
    )}`
  }

    useEffect(() => {    
      const paginationParams: GetCoursesParams = {
        take: pagination.take,
        order: pagination.order,
        orderBy: pagination.orderBy,
        page: pagination.currentPage,
        name: courseName,
      }     
      props.getAllCourses
        .getAll(paginationParams)
        .then((data) => {           
         setCourses(data.data)
         setTotalPage(data.total)
        })
        .catch((error) => toast.error("Não foi possível listar os cursos."))
        .finally(() => 
         setTimeout(() => {
          setLoading(false)
         }, 500)
         
        )
    }, [refresher, pagination.take, pagination.currentPage, pagination.order, courseName])

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search ref={searchCourseFormRef} onChangeText={handleSearchCourse} />
          </h3>
          <div className='card-toolbar'>
            <Link href='/courses/create'>
              <a className='btn btn-sm btn-light-primary'>
                <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                Novo Curso
              </a>
            </Link>
          </div>
        </div>

        {courses.length > 0 && (
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th className={getColumnHeaderClasses('name')}
                    onClick={() => handleOrdenation('name')}
                    >Nome</th>
                    <th className={getColumnHeaderClasses('description', 'min-w-150px')}
                     onClick={() => handleOrdenation('description')}>Descrição</th>
                    <th className={getColumnHeaderClasses('price')}
                     onClick={() => handleOrdenation('price')}>Preço</th>
                    <th className={getColumnHeaderClasses('discount')}
                     onClick={() => handleOrdenation('discount')}>Desconto</th>
                    <th className={getColumnHeaderClasses('teacher')}
                     onClick={() => handleOrdenation('teacher')}>Professor</th>
                    <th className={getColumnHeaderClasses('isActive', 'min-w-110px')}
                     onClick={() => handleOrdenation('isActive')}>Ativo</th>
                    <th className='text-dark min-w-50px text-center rounded-end'>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    courses?.map((item) => (
                      <Row
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={currenceMask(item.price)}
                        discount={currenceMask(item.discount)}
                        teacher={item.teacherName}
                        active={item.isActive}
                        deleteCourse={props.deleteCourse}
                        updateCourse={props.updateCourse}
                        getCourse={props.getCourse}
                        handleRefresher={handleRefresher}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {courses.length == 0 && !loading && <ItemNotFound message = 'Nenhum curso encontrado'/>}

        {loading && <Loading/>}

        <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )

  
}
