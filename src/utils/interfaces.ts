interface PostType {
    post_id : number;
    title : string;
    content : string;
    created_at : string;
    like_cnt : number
}


interface NewPostType {
    user_id : string;
    title : string;
    content : string;
}


interface CommentLikeType {
    user_id : string;
    post_id : number;
    content? : string;
}

export type {
    PostType,
    NewPostType,
    CommentLikeType
}