import axios from 'axios';

const userApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

// profile api
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

// address api
export const getAddressApi = async (type) => {
    const res = await userApi.get(`/api/acc/address/${type}`);
    return res.data;
}

export const getAddressByIdApi = async (id, type) => {
    const res = await userApi.get(`/api/acc/${type}/address/${id}`);
    return res.data;
}

export const addAddressApi = async (address) => {
    const res = await userApi.post(`/api/acc/${address.type}/address`, address);
    return res.data;
}

export const updateAddressApi = async (address) => {
    const res = await userApi.post(`/api/acc/${address.type}/address/${address.id}`, address);
    return res.data;
}

export const deleteAddressApi = async (address) => {
    const res = await userApi.delete(`/api/acc/${address.type}/address/${address.id}`);
    return res.data;
}


// address by uid
export const getAddressByUidApi = async (id, type) => {
    const res = await userApi.get(`/api/acc/${type}/address/uid/${id}`);
    return res.data;
}


export const updateAddressByUidApi = async (address) => {
    const res = await userApi.post(`/api/acc/${address.type}/address/uid/${address.id}`, address);
    return res.data;
}

export const deleteAddressByUidApi = async (address) => {
    const res = await userApi.delete(`/api/acc/${address.type}/address/uid/${address.id}`);
    return res.data;
}