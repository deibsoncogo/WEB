export interface ICourseResponse{
    id: string,
    name: string,
    description: string,
    image: string,
    price: number,
    installments: number,
    discount: number,
    userId: string,
    content: string,
    isActive: boolean,
    categoryId: string
}