export interface IUploadFileChatRoom {
  upload: (data: FormData) => Promise<void>
}
