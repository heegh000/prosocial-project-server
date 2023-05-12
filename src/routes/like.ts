import { Router, Request, Response } from 'express';
import { db } from '../database/db';
import { sql_like_check, sql_like_inc } from '../utils/sql'
import { CommentLikeType } from '../utils/interfaces'

const router : Router = Router();

router.post('/', async(req : Request, res : Response) => {
    try {
        if(!req.cookies.user_id) {
            // throw 'There is no user id';
            req.cookies.user_id = 'default_id';
        }

        const like_info : CommentLikeType = {
            user_id : req.cookies.user_id,
            post_id : Number(req.body.post_id)
        }

        const sql_check : string = sql_like_check(like_info);
        let result_cnt : number = (await db.query(sql_check)).rowCount;

        result_cnt = 1;
        if(result_cnt == 0) {
            res.status(400).send('fail')
        }
        else {
            const sql_inc : string = sql_like_inc(like_info);
            await db.query(sql_inc);  
            res.send('success');
        }
    }
    catch(err) {
        if(err instanceof Error) {
            console.error("Error like: " + err);
        }
        else {
            console.log("Unknwon Error like: " + err);
        }
        res.status(500).send("fail");
    }
});

export { router };