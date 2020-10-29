import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/User';
const { ObjectId } = mongoose.Types;

// params로 넘어오는 id가 ObjectId 형식인지 validate 
export const checkObjectId = (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        ctx.body = 'objectId validation error';
        return;
    }
    return next();
};

// 쿠키에 들어있는 토큰값으로 state에 user정보 저장 + 토큰 만료 시 재발급
export const jwtValidate = async (ctx, next) => {
    const token = ctx.cookies.get('access_token');
    if (!token) return next();
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username,
        };
        
        // 만료날짜가 3.5일 이내이면 토큰을 재발급
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            ctx.cookies.set('access_token', token, {
                maxAge: 60 * 60 * 24 * 7,
                httpOnly: true,
            });
        }

        return next();
    } catch (err) {
        console.log(err);
        return next();
    }
};

// 로그인되어있는지 여부 판단
export const checkLoggedIn = (ctx, next) => {
    if (!ctx.state.user) {
        ctx.status = 401;
        return;
    }
    return next();
};
