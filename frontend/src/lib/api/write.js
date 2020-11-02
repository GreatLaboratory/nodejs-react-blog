import client from './client';

export const writePost = async ({ title, body, tagList }) => {
    try {
        const response = await client.post('/api/post', { title, body, tags: tagList });
        return response.data;
    } catch (err) { 
        console.log(err);
        return err;
    }
}

export const updatePost = async ({ id, title, body, tagList }) => {
    try {
        const response = await client.patch(`/api/post/${id}`, {
            title,
            body,
            tags: tagList,
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}