import { resolveTypeReferenceDirective } from 'typescript';
import { db } from '../database/db';
import { NewPostType, CommentLikeType } from './interfaces'

const sql_post_list = (page_num : number) : string=> {
    return `
    SELECT 
        board.post_id AS "postId",
        title,
        board.content,
        TO_CHAR(board.created_at, 'MM/DD\nHH24:MI') AS "createdAt",
        COALESCE(like_cnt, 0) AS "likeCnt",
        COALESCE(comments, '{}') AS "commentList"
    FROM prosocial.board AS board
    LEFT JOIN (
        SELECT
            l.post_id,
            COUNT(*) AS like_cnt
        FROM prosocial.like as l
        GROUP BY l.post_id
    ) AS cnt
    ON cnt.post_id = board.post_id
    LEFT JOIN (
        SELECT
            cm.post_id,
            ARRAY_AGG(cm.content) as comments
        FROM prosocial.comment as cm
        GROUP BY cm.post_id
        ORDER BY cm.post_id
    ) AS cms
    ON board.post_id = cms.post_id
    ORDER BY board.post_id DESC
    OFFSET ${page_num * 5} LIMIT 5;
    `
};

const sql_post_add = (data : NewPostType) : string=> {
    return `
        INSERT INTO prosocial.board(
            user_id, title, content)
        VALUES (${db.escapeLiteral(data.user_id)}, ${db.escapeLiteral(data.title)}, ${db.escapeLiteral(data.content)});
    `
};


const sql_comment_list = (data : CommentLikeType) : string => {
    return `
        SELECT
            ARRAY_AGG(cm.content) as "comments"
        FROM prosocial.comment as cm
        WHERE cm.post_id = ${db.escapeLiteral(data.post_id.toString())}
        GROUP BY cm.post_id
        ORDER BY cm.post_id
    `
}

const sql_comment_add = (data : CommentLikeType) : string => {
    return `
        INSERT INTO prosocial.comment(
            user_id, post_id, content)
        VALUES (${db.escapeLiteral(data.user_id)}, ${db.escapeLiteral(data.post_id.toString())}, ${db.escapeLiteral(data.content as string)});
    `
}


const sql_like_check = (data : CommentLikeType) : string => {
    return `
        SELECT 
            post_id
        FROM 
            prosocial.like AS l
        WHERE l.user_id = ${db.escapeLiteral(data.user_id)}
            AND l.post_id = ${db.escapeLiteral(data.post_id.toString())}
    `
};

const sql_like_inc = (data : CommentLikeType) : string => {
    return `
        INSERT INTO prosocial.like(
            user_id, post_id)
        VALUES (${db.escapeLiteral(data.user_id)}, ${db.escapeLiteral(data.post_id.toString())});
    `
}

export {
    sql_post_list,
    sql_post_add,
    sql_comment_list,
    sql_comment_add,
    sql_like_check,
    sql_like_inc
}