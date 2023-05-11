import express, { Express, Request, Response, NextFunction } from 'express';
import { db } from './database/db';
import { router as board } from './routes/board';
import { router as signup } from './routes/signup';
import { router as signin } from './routes/signin';
import { router as test } from './routes/test';
import cors from 'cors'

const app : Express = express();
const port : number = 1324;

//db 연결
db.connect();
console.log("DB connected")

//CORS 설정
app.use(cors<Request>({
    origin: 'http://172.25.128.1:3000',
    credentials: true
}));

//request body 데이터 처리를 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({extended : false }));

//테스팅 라우터
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/board', board)
app.use('/test', test);

//에러 처리
app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    console.error(err);
    res.status(500).send('Unknown Error');
});

app.listen(port, () => {
    console.log("Server Start");
});