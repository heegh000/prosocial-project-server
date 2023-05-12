import { Router, Request, Response } from 'express';
import { db } from '../database/db';
import { sql_post_list, sql_post_add } from '../utils/sql'
import { PostType, NewPostType } from '../utils/interfaces'

const router : Router = Router();

router.get('/', async(req : Request, res : Response) => {
    try {
        // if(!req.cookies.user_id) {
        //     const privateKey = Math.floor(Math.random() * 1000000000);
        //     res.cookie('user_id', privateKey, {
        //         maxAge: 60 * 60 * 24 * 30,
        //         // sameSite : 'none',
        //         // secure: true
        //     });
        // }

        const page_num : number = Number(req.query.page_num);
        if(isNaN(page_num)) {
            throw 'Page number is not Number type';
        }

        const sql : string = sql_post_list(page_num);
        let result : PostType[] = [];
        result = (await db.query(sql)).rows;

        res.send(result);
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

router.post('/', async(req : Request, res : Response) => {
    try {
        if(!req.cookies.user_id) {
            // throw 'There is no user id';
            req.cookies.user_id = 'default_id';
        }

        const post_info : NewPostType = {
            user_id : req.cookies.user_id,
            title : req.body.title,
            content : req.body.content
        } 

        const sql = sql_post_add(post_info);
        await db.query(sql);

        res.send('success');
    }
    catch(err) {
        if(err instanceof Error) {
            console.error("Error board add: " + err);
        }
        else {
            console.log("Unknwon Error board add: " + err);
        }
        res.status(500).send("fail");
    }
});

export { router };