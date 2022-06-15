import { CourseClass } from './courseClass'
import { DeleteFileUpload } from './deleteFile'

export class UpdateCourse {
  id?: string
  name: string
  description: string
  content: string
  categoryId: string
  discount?: string
  imageUrl?: string
  installments: string
  isActive?: boolean
  price?: string
  accessTime: string
  userId: string
  courseClass?: CourseClass[]
  deleteFiles?: DeleteFileUpload[]

  constructor(
    id: string | undefined,
    name: string,
    description: string,
    content: string,
    categoryId: string,
    discount: string,
    imageUrl: string | undefined,
    installments: string,
    isActive: boolean | undefined,
    price: string,
    accessTime: string,
    userId: string,
    courseClass?: CourseClass[],
    deleteFiles?: DeleteFileUpload[]
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.content = content
    this.categoryId = categoryId
    this.discount = discount
    this.imageUrl = imageUrl
    this.installments = installments
    this.isActive = isActive
    this.price = price
    this.accessTime = accessTime
    this.userId = userId
    this.courseClass = courseClass
    this.deleteFiles = deleteFiles
  }
}
