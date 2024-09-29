import axios from 'axios';

const userApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

export const getUserApi = async (type) => {
    const res = await userApi.get(`/api/acc/${type}`);
    return res.data;
}

export const getUserByIdApi = async (id, type) => {
    const res = await userApi.get(`/api/acc/${type}/${id}`);
    return res.data;
}

export const addUserApi = async (user) => {
    const res = await userApi.post(`/api/acc/${user.type}`, user);
    return res.data;
}

export const updateUserApi = async (user) => {
    const res = await userApi.post(`/api/acc/${user.type}/${user.id}`, user);
    return res.data;
}

export const deleteUserApi = async (user) => {
    const res = await userApi.delete(`/api/acc/${user.type}/${user.id}`);
    return res.data;
}