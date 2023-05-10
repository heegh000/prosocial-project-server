import express, { Express, Request, Response, NextFunction, application} from 'express';
import { router as test } from './router/test';
import cors from 'cors'

const app : Express = express();
const port : number = 1324  ;


//CORS 설정
app.use(cors<Request>());

//request body 데이터 처리를 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({extended : false }));

//테스팅 라우터
app.use('/test', test);

//에러 처리
app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    console.error(err);
    res.status(500).send('Unknown Error');
});

app.listen(port, () => {
    console.log("Server Start");
});