export interface IDeleteFreeContent {
    delete: (id: string) => Promise<string>
}