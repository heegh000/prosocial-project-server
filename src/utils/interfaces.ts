interface PostInfo {
    post_id : number;
    title : string;
    content : string;
    created_at : string;
    like_cnt : number
}


interface PostToAdd {
    user_id : string;
    title : string;
    content : string;
}



export type {
    PostToAdd,
    PostInfo
}