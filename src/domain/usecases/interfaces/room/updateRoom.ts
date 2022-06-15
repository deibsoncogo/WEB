

export interface IUpdateRoom {
    update:(updateRoom: FormData) => Promise<boolean>
}