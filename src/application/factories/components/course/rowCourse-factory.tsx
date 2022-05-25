import { Row } from "../../../../layout/components/tables/courses-list/row"

type IMakeCourseRow = {
    id: string
    name: string
    description: string
    price: number
    discount: number
    teacher: string
    active: boolean
  }


export function MakeCourseRow({ id, name, description, price, discount, teacher, active }: IMakeCourseRow) {
    return (
      <Row
        id = {id}
        name = {name}
        description = {description}
        price = {price}
        discount = {discount}
        teacher = {teacher}
        active = {active}
      />
    )
  }
  