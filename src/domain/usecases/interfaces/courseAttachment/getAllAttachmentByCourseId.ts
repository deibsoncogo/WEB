import { ICourseAttachmentResponse } from "../../../../interfaces/api-response/courseAttachmentResponse";

export interface IGetAllAttachmentByCourseId {
    getAllByCourseId:(id: string) => Promise<ICourseAttachmentResponse[]>
}

