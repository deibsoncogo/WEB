export class UpdateBook {
  id?: string
  name: string
  description: string
  content: string
  level: string
  discount?: number
  image: Blob
  installments: number
  isActive?: boolean
  price?: number
  accessTime: number
  userId: string

  constructor(
    id: string | undefined,
    name: string,
    description: string,
    content: string,
    level: string,
    discount: number | undefined,
    image: Blob,
    installments: number,
    isActive: boolean | undefined,
    price: number | undefined,
    accessTime: number,
    userId: string
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.content = content
    this.level = level
    this.discount = discount
    this.image = image
    this.installments = installments
    this.isActive = isActive
    this.price = price
    this.accessTime = accessTime
    this.userId = userId
  }
}
