export class CourseClass { 
  id?: string 
  name: string;
  link: string;
  displayOrder: number;



  constructor(name: string, link: string, displayOrder: number){
      this.name = name;
      this.link = link;
      this.displayOrder = displayOrder
       
  }
}