import { FormHandles } from '@unform/core'
import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../application/hooks/usePagination'
import { roles } from '../../../../application/wrappers/authWrapper'
import { IDeleteCourse } from '../../../../domain/usecases/interfaces/course/deleteCourse'
import {
  GetCoursesParams,
  IGetAllCourses,
} from '../../../../domain/usecases/interfaces/course/getAllCourses'
import { IGetAllTeacherCourses } from '../../../../domain/usecases/interfaces/course/getAllTeacherCourses'
import { IToggleCourseStatus } from '../../../../domain/usecases/interfaces/course/toggleCourseStatus'
import { IUpdateCourse } from '../../../../domain/usecases/interfaces/course/upDateCourse'
import { KTSVG } from '../../../../helpers'
import { debounce } from '../../../../helpers/debounce'
import { keys } from '../../../../helpers/KeyConstants'
import { IPartialCourseResponse } from '../../../../interfaces/api-response/coursePartialResponse'
import { IToken } from '../../../../interfaces/application/token'
import { maskedToMoney } from '../../../formatters/currenceFormatter'
import { Loading } from '../../loading/loading'
import { Pagination } from '../../pagination/Pagination'
import { ItemNotFound } from '../../search/ItemNotFound'
import { Search } from '../../search/Search'
import { Row } from './row'

type Props = {
  getAllCourses: IGetAllCourses
  getAllTeacherCourses: IGetAllTeacherCourses
  deleteCourse: IDeleteCourse
  toggleCourseStatus: IToggleCourseStatus
}

export default function CoursesTable(props: Props) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [userId, setUserId] = useState('')
  const [courses, setCourses] = useState<IPartialCourseResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [refresher, setRefresher] = useState(true)

  const [courseName, setCourseName] = useState('')
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const searchCourseFormRef = useRef<FormHandles>(null)

  function handleRefresher() {
    setRefresher(!refresher)
  }

  const handleSearchCourse = debounce((text: string) => {
    setCourseName(text)
  })

  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} cursor-pointer ${getClassToCurrentOrderColumn(name)}`
  }

  async function getCourses(paginationParams: GetCoursesParams) {
    try {
      if (!isAdmin && userId) {
        const { total, data } = await props.getAllTeacherCourses.getAll(paginationParams, userId)
        setCourses(data)
        setTotalPage(total)
        setTimeout(() => {
          setLoading(false)
        }, 500)
        return
      }

      if (isAdmin && userId) {
        const { total, data } = await props.getAllCourses.getAll(paginationParams)
        setCourses(data)
        setTotalPage(total)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    } catch (err) {
      toast.error('Erro ao buscar cursos!')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem(keys.TOKEN)
    if (token) {
      const values = jwtDecode<IToken>(token)
      setUserId(values.id)
      setIsAdmin(values.role === roles.ADMIN)
    }
  }, [])

  useEffect(() => {
    const paginationParams: GetCoursesParams = {
      take: pagination.take,
      order: pagination.order,
      orderBy: pagination.orderBy,
      page: pagination.currentPage,
      name: courseName,
    }
    getCourses(paginationParams)
  }, [
    refresher,
    pagination.take,
    pagination.currentPage,
    pagination.order,
    courseName,
    isAdmin,
    userId,
  ])

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search ref={searchCourseFormRef} onChangeText={handleSearchCourse} />
          </h3>
          {isAdmin && (
            <div className='card-toolbar'>
              <Link href='/courses/create'>
                <a className='btn btn-sm btn-light-primary'>
                  <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                  Novo Curso
                </a>
              </Link>
            </div>
          )}
        </div>

        {courses.length > 0 && (
          <>
            <div className='card-body py-3'>
              <div className='table-responsive'>
                <table className='table align-middle gs-2 gy-4'>
                  <thead>
                    <tr className='fw-bolder text-muted bg-light'>
                      <th
                        className={getColumnHeaderClasses('name') + ' rounded-start'}
                        onClick={() => handleOrdenation('name')}
                      >
                        Nome
                      </th>
                      <th
                        className={getColumnHeaderClasses('description', 'min-w-150px')}
                        onClick={() => handleOrdenation('description')}
                      >
                        Descri????o
                      </th>
                      <th
                        className={getColumnHeaderClasses('price')}
                        onClick={() => handleOrdenation('price')}
                      >
                        Pre??o
                      </th>
                      <th
                        className={getColumnHeaderClasses('discount')}
                        onClick={() => handleOrdenation('discount')}
                      >
                        Desconto
                      </th>
                      <th
                        className={getColumnHeaderClasses('teacher')}
                        onClick={() => handleOrdenation('teacher')}
                      >
                        Professor
                      </th>
                      <th
                        className={getColumnHeaderClasses('isActive', 'min-w-110px')}
                        onClick={() => handleOrdenation('isActive')}
                      >
                        Ativo
                      </th>
                      <th
                        className='text-dark min-w-50px text-end rounded-end'
                        style={{ verticalAlign: 'middle', paddingRight: '3.5rem' }}
                      >
                        A????o
                      </th>
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
                          price={maskedToMoney(item.price)}
                          discount={maskedToMoney(item.discount)}
                          teacher={item.teacherName}
                          active={item.isActive}
                          belongsToPlans={item.belongsToPlans}
                          deleteCourse={props.deleteCourse}
                          toggleCourseStatus={props.toggleCourseStatus}
                          handleRefresher={handleRefresher}
                          isAdmin={isAdmin}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
              <Pagination paginationHook={paginationHook} />
            </div>
          </>
        )}

        {courses.length == 0 && !loading && <ItemNotFound message='Nenhum curso encontrado' />}

        {loading && <Loading />}
      </div>
    </>
  )
}
