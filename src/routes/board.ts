import { Router, Request, Response, response } from 'express';

const router : Router = Router();

router.post('/init', async(req : Request, res : Response) => {
    try {
        console.log("ASDSAD");
        console.log(req.body);
        res.send(req.body);
    }
    catch(err) {


        
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