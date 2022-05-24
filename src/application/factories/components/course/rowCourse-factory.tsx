import { Row } from "../../../../layout/components/tables/courses-list/row"

type IMakeCourseRow = {
    id: string
    name: string
    description: string
    price: string
    discount: string
    teacher: string
    active: string
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
  