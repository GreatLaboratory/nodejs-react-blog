import User from '../models/User';
import Joi from '@hapi/joi';

// POST -> 회원가입
export const register = async (ctx) => {
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    const { username, password } = ctx.request.body;
    try {
        const exUser = await User.findByUsername(username);
        if (exUser) {
            ctx.status = 409;
            return;
        }
        const user = new User({ username });
        await user.setPassword(password);
        await user.save();
        
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};

// POST -> 로그인
export const login = async (ctx) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.status = 401;
        return;
    }
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            ctx.status = 401;
            return;
        }
        const valid = await user.checkPassword(password);
        if (!valid) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};

// GET -> 로그인 체크
export const check = async (ctx) => {
    const { user } = ctx.state;
    try {
        if (!user) {
            ctx.status = 401;
            return;
        }
        ctx.body = user;
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};

// POST -> 로그아웃
export const logout = async (ctx) => {
    try {
        ctx.cookies.set('access_token');
        ctx.status = 204;
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};
