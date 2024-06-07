import axios from 'axios';

const userApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

export const getUser = async () => {
    const res = await userApi.get('/api/user');
    return res.data;
}

export const addUser = async () => {
    const res = await userApi.post('/api/user');
    return res.data;
}

export const updateUser = async (user) => {
    const res = await userApi.post(`/api/user/${user._id}`, user);
    return res.data;
}