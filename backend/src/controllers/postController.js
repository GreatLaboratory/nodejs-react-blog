import Joi from '@hapi/joi';
import Post from '../models/Post';
import sanitizeHtml from 'sanitize-html';

// html을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = (body) => {
    const filtered = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

// POST -> 게시물 생성
export const createPost = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;
    console.log('request ===> ' + ctx.request.body);
    const post = new Post({
        title,
        body: sanitizeHtml(body, {
            allowedTags: [
                'h1',
                'h2',
                'b',
                'i',
                'u',
                's',
                'p',
                'ul',
                'ol',
                'li',
                'a',
                'img',
                'blockquote',
            ],
            allowedAttributes: {
                a: ['href', 'name', 'target'],
                img: ['src'],
                li: ['class']
            },
            allowedSchemes: ['data', 'http']
        }),
        tags,
        user: ctx.state.user
    });
    try {
        await post.save();
        ctx.body = post;
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};

// GET -> 게시물 목록 조회
export const getPostList = async (ctx) => {
    const page = parseInt(ctx.query.page || '1');
    const limit = parseInt(ctx.query.limit || '10');
    if (page < 1) {
        ctx.status = 400;
        return;
    }
    const { tag, username } = ctx.query;
    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag } : {})
    };
    try {
        const postList = await Post.find(query)
            .sort({ _id: -1 })
            .limit(limit)
            .skip((page - 1) * 10)
            .lean() // 이거로 데이터가 인스턴스 형태가 아닌 JSON형태로 바꿔준다.
            .exec();
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = postList
            // .map(post => post.toJSON()) -> lean()함수로 필요없음.
            .map(post => ({
                ...post,
                body: removeHtmlAndShorten(post.body)
            }));
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};

// GET -> 특정 게시물 조회
export const getPost = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};

// PATCH -> 게시물 수정
export const updatePost = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    const { id } = ctx.params;
    const nextData = { ...ctx.request.body };
    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body);
    }
    try {
        const post = await Post.findByIdAndUpdate(id, nextData, { new: true }).exec(); // 이러면 업데이트된 후의 객체를 반환
        if (!post) {
            ctx.status = 404;
            return;
        }
        if (post.user._id.toString() !== ctx.state.user._id) {
            ctx.status = 403;
            return;
        }
        ctx.body = post;
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};

// DELETE -> 게시물 삭제
export const deletePost = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if (post.user._id.toString() !== ctx.state.user._id) {
            ctx.status = 403;
            return;
        }
        await post.remove();
        ctx.status = 204;
    } catch (err) {
        console.log(err);
        ctx.throw(500, err);
    }
};
