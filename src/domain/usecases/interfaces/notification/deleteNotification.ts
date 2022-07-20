export interface IDeleteNotification {
    delete: (id: string) => Promise<string>
}