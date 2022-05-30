export interface IDeleteCourse {
    delete: (id: string) => Promise<string>
}