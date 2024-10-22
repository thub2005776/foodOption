import axios from 'axios';

const NotifyApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


// notify api
export const getNotifyApi = async () => {
    const res = await NotifyApi.get('/api/notify');
    return res.data;
}

export const getNotifyByUidApi = async (userID) => {
    const res = await NotifyApi.get(`/api/notify/uid/${userID}`);
    return res.data;
}

export const getNotifyByCidApi = async (checkID) => {
    const res = await NotifyApi.get(`/api/notify/cid/${checkID}`);
    return res.data;
}


export const getNotifyByIdApi = async (Id) => {
    const res = await NotifyApi.get(`/api/notify/${Id}`);
    return res.data;
}

export const addNotifyApi = async (notify) => {
    const res = await NotifyApi.post('/api/notify', notify);
    return res.data;
}

export const updateNotifyApi = async (notify) => {
    const res = await NotifyApi.post(`/api/notify/${notify.id}`, notify);
    return res.data;
}


export const deleteNotifyByUidApi = async (id) => {
    const res = await NotifyApi.delete(`/api/notify/uid/${id}`);
    return res.data;
}

export const deleteNotifyByCidApi = async (id) => {
    const res = await NotifyApi.delete(`/api/notify/cid/${id}`);
    return res.data;
}

export const deleteNotifyApi = async (id) => {
    const res = await NotifyApi.delete(`/api/notify/${id}`);
    return res.data;
}