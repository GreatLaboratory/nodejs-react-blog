import Router from 'koa-router';
import { check, login, register, logout } from '../controllers/userController';

const user = new Router();

user.post('/register', register);
user.post('/login', login);
user.get('/check', check);
user.post('/logout', logout);

export default user;
