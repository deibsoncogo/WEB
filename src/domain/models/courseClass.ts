export class CourseClass {
  static cont: number = 0
  id: number
  name: string;
  link: string;
  displayOrder: number;


  constructor(name: string, link: string, displayOrder: number){
      this.name = name;
      this.link = link;
      this.displayOrder = displayOrder
      CourseClass.cont++
      this.id = CourseClass.cont
  }
}