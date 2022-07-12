

export class CreateFreeContent{
    title: string;    
    description: string
    contentType: string 
    link?: string       
    authorName?: string;
    articleContent?: string

    constructor(title: string, description: string, contentType: string, link: string,
        authorName: string, articleContent: string)
    {
        this.title = title;
        this.description = description;
        this.contentType = contentType;
        this.link = link;
        this.authorName = authorName;
        this.articleContent = articleContent;
    
    }
}