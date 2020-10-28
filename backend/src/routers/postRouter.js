import Router from 'koa-router';
import { createPost, getPost, getPostList, updatePost, deletePost } from '../controllers/postController';
import { checkObjectId, checkLoggedIn } from '../controllers/middleWare';

const posts = new Router();

// const printInfo = ctx => {
//     ctx.body = {
//         method: ctx.method,
//         path: ctx.path,
//         params: ctx.params,
//         query: ctx.query,
//     };
// };

// posts.get('/test', printInfo);
posts.post('/', checkLoggedIn, createPost);
posts.get('/', getPostList);
posts.get('/:id', checkObjectId, getPost);
posts.patch('/:id', checkLoggedIn, checkObjectId, updatePost);
posts.delete('/:id', checkLoggedIn, checkObjectId, deletePost);

export default posts;
