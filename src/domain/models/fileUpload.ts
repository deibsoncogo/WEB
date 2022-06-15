export class FileUpload {  
    name: string;
    originalName: string;
    fileKey?: string
    file?: File;
  
  
  
    constructor(name: string, originalName: string, file: File){
        this.name = name;
        this.originalName = originalName;
        this.file = file
         
    }
  }