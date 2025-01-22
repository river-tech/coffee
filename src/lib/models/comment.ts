export interface ICommentCreate {
    userComment: string;
    content: string;
}

export interface ICommentEdit{
    content : string;
}

export interface ICommentShow{
    id : number;
    username : string;
    content : string;
}

export interface IComment{
    username : string;
    ratingIndex : number;
    content : string;
}