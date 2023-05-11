import { Router, Request, Response } from 'express';
import { db } from '../database/db';
import { sql_like_check, sql_like_inc } from '../utils/sql'
import { CommentLikeType } from '../utils/interfaces'

const router : Router = Router();

router.post('/', async(req : Request, res : Response) => {
    try {
        if(!req.cookies.user_id) {
            const privateKey = Math.floor(Math.random() * 1000000000);
            res.cookie('user_id', privateKey, {
                maxAge: 60 * 60 * 24 * 30,
                // sameSite : 'none',
                // secure: true
            });
        }

        const like_info : CommentLikeType = {
            user_id : req.cookies.user_id,
            post_id : Number(req.body.post_id)
        }

        const sql_check : string = sql_like_check(like_info);
        let result_cnt : number = (await db.query(sql_check)).rowCount;

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
            console.error("Error board init: " + err);
        }
        else {
            console.log("Unknwon Error board init: " + err);
        }
        res.status(500).send("fail");
    }
});

export { router };