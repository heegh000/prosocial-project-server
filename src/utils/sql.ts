import { db } from '../database/db';
import { PostToAdd } from './interfaces'

const sql_board_init = (page_num : number) : string=> {
    return `
    SELECT 
        board.post_id,
        title,
        content,
        created_at,
        COALESCE(like_cnt, 0) as like_cnt
    FROM prosocial.board AS board
    LEFT JOIN (
        SELECT
            l.post_id,
            COUNT(*) AS like_cnt
        FROM prosocial.like as l
        GROUP BY l.post_id
    ) AS cnt
    ON cnt.post_id = board.post_id
    ORDER BY board.post_id
    OFFSET ${page_num * 5} LIMIT 5;
    `
}

const sql_add_post = (data : PostToAdd) : string=> {
    return `
        INSERT INTO prosocial.board(
            user_id, title, content)
            VALUES ${db.escapeLiteral(data.user_id)}, ${db.escapeLiteral(data.title)}, ${db.escapeLiteral(data.content)});
    
    `
}

export {
    sql_board_init,
    sql_add_post
}