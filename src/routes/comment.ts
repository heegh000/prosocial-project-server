import { Router, Request, Response } from 'express';
import { db } from '../database/db';
import { sql_comment_list, sql_comment_add } from '../utils/sql'
import { CommentLikeType } from '../utils/interfaces'

const router : Router = Router();

router.get('/', async(req : Request, res : Response) => {
    try {
        if(!req.cookies.user_id) {
            // throw 'There is no user id';
            req.cookies.user_id = 'default_id';
        }

        const comment_info : CommentLikeType = {
            user_id : req.cookies.user_id,
            post_id : Number(req.query.post_id)
        }

        const sql : string = sql_comment_list(comment_info);
        const result : any = (await db.query(sql)).rows[0];

        res.send(result);
    }
    catch(err) {
        if(err instanceof Error) {
            console.error("Error comment list " + err);
        }
        else {
            console.log("Unknwon Error comment list " + err);
        }
        res.status(500).send("fail");
    }
});

router.post('/', async(req : Request, res : Response) => {
    try {
        if(!req.cookies.user_id) {
            // throw 'There is no user id';
            req.cookies.user_id = 'default_id';
        }

        const comment_info : CommentLikeType = {
            user_id : req.cookies.user_id,
            post_id : Number(req.body.post_id),
            content : req.body.content
        }

        const sql = sql_comment_add(comment_info);
        await db.query(sql);

        res.send('success');
    }
    catch(err) {
        if(err instanceof Error) {
            console.error("Error comment add: " + err);
        }
        else {
            console.log("Unknwon Error comment add: " + err);
        }
        res.status(500).send("fail");
    }
});

export { router };