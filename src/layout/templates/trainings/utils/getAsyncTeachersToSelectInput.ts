import { toast } from 'react-toastify'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { IGetAllUsers } from '../../../../domain/usecases/interfaces/user/getAllUsers'
import { Role } from '../../../../domain/usecases/interfaces/user/role'

type Params = {
  teacherName: string
  remoteGetTeachers: IGetAllUsers
}

const getAsyncTeachersToSelectInput = async ({
  remoteGetTeachers,
  teacherName,
}: Params): Promise<ISelectOption[]> => {
  try {
    const { data } = await remoteGetTeachers.getAll({
      name: teacherName,
      order: 'asc',
      page: 1,
      take: 5,
      role: Role.Teacher,
    })

    const teacherOptions: ISelectOption[] = data.map((teacher) => ({
      label: teacher.name,
      value: teacher.id,
    }))

    return teacherOptions
  } catch {
    toast.error('Falha em buscar os professores')
    return []
  }
}

export { getAsyncTeachersToSelectInput }
