import express, { Express, Request, Response, NextFunction } from 'express';
import { db } from './database/db';
import { router as board } from './routes/board';
import { router as comment } from './routes/comment';
import { router as like } from './routes/like';
import { router as test } from './routes/test';
import cors from 'cors'
import cookieParser from 'cookie-parser' 

const app : Express = express();
const port : number = 1324;

//db 연결
db.connect();
console.log("DB connected")

//CORS 설정
app.use(cors<Request>({
    origin: ['http://prosocial1004.site', 'https://prosocial1004.netlify.app', 'http://localhost:3000'],
    credentials: true
}));

//쿠키 암호화 설정
app.use(cookieParser());

//request body 데이터 처리를 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({extended : false }));

//테스팅 라우터
app.use('/board', board)
app.use('/comment', comment);
app.use('/like', like);
app.use('/test', test);

//에러 처리
app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    console.error(err);
    res.status(500).send('Unknown Error');
});

app.listen(port, () => {
    console.log("Server Start");
});