import { Router, Request, Response } from 'express';
import { db } from '../database/db';
import { sql_board_init } from '../utils/sql'
import { PostInfo } from '../utils/interfaces'

const router : Router = Router();

router.get('/', async(req : Request, res : Response) => {
    try {
        if(!req.cookies.user_id) {
            const privateKey = Math.floor(Math.random() * 1000000000);
            res.cookie('user_id', privateKey, {
                maxAge: 60 * 60 * 24 * 30,
                // sameSite : 'none',
                // secure: true
            });
        }

        const page_num : number = Number(req.query.page_num);
        if(isNaN(page_num)) {
            throw 'Page number is not Number type';
        }

        const sql : string = sql_board_init(page_num);
        let result : PostInfo[] = [];
        result = (await db.query(sql)).rows;

        res.send(JSON.stringify(result));
    }
    catch(err) {
        if(err instanceof Error) {
            console.error("Error board init: " + err);
        }
        else {
            console.log("Unknwon Error board init: " + err);
        }
        res.status(500).send("Fail");
    }
});

router.post('/add', async(req : Request, res : Response) => {
    try {
        console.log("ASDSAD");
        console.log(req.body);
        res.send(req.body);
    }
    catch(err) {


        
    }
});

export { router };