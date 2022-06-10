export class DeleteFileUpload {
  id: string
  fileKey?: string

  constructor(id: string, fileKey: string | undefined) {
    this.id = id
    this.fileKey = fileKey
  }
}
