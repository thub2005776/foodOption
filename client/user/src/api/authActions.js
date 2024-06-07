import axios from 'axios';

axios.defaults.withCredentials = true;
const authApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

export const signUpApi = async (auth) => {
    const res = await authApi.post(`/signup`, auth);
    return res.data;
}

export const loginApi = async (auth) => {
    const key = 'user';
    const res = await authApi.post(`/login/${key}`, auth);
    return res.data;
}

export const verifyApi = async () => {
    const key = 'user';
    const res = await authApi.get(`/verify/${key}`);
    return res.data;
}

export const logoutApi = async () => {
    const key = 'user';
    const res = await authApi.get(`/logout/${key}`);
    return res.data;
}