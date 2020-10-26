require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';
import post from './routers/postRouter';
import user from './routers/userRouter';
import { jwtValidate } from './controllers/middleWare';

// 전역변수 설정
const app = new Koa();
const router = new Router();
const { PORT, MONGO_URI } = process.env;

// DB Connection
const connect = async () => {
    await mongoose.connect(MONGO_URI, {
        dbName : 'blog',
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, (error) => {
        if (error) console.error('몽고디비 연결 에러', error);
        else console.log('몽고디비 연결 성공');
    });
};
connect();
mongoose.connection.on('error', (error) => {
    console.log('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.log('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

// 미들웨어 - 라우터
router.use('/api/post', post.routes());
router.use('/api/user', user.routes());

// 미들웨어 - config
app.use(bodyParser());
app.use(jwtValidate);
app.use(router.routes()).use(router.allowedMethods());


// port listening
const port = PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
