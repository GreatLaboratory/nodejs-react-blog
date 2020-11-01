import client from './client';

export const login = async ({ username, password }) => {
    try {
        const response = await client.post('/api/user/login', { username, password });
        return response.data;
    } catch (err) { 
        console.log(err);
        return err;
    }
}
export const register = async ({ username, password }) => {
    try {
        const response = await client.post('/api/user/register', { username, password });
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}
export const check = async () => {
    try {
        const response = await client.get('/api/user/check');
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const logout = async () => {
    try {
        await client.post('/api/user/logout');
    } catch (err) {
        console.log(err);
        return err;
    }
}