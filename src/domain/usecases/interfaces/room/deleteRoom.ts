export interface IDeleteRoom {
    delete: (id: string) => Promise<string>
}