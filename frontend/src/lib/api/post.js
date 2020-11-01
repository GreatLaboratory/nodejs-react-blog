import client from './client';
import qs from 'qs';

export const readPost = async (id) => {
    try {
        const response = await client.get(`/api/post/${id}`);
        return response.data;
    } catch (err) { 
        console.log(err);
        return err;
    }
}

export const readPostList = async ({ page, username, tag}) => {
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    try {
        const response = await client.get(`/api/post?${queryString}`);
        return response;
    } catch (err) { 
        console.log(err);
        return err;
    }
}

export const removePost = async (id) => {
    try {
        await client.delete(`/api/post/${id}`)
    } catch (error) {
        console.log(error);
        return error;
    }
}