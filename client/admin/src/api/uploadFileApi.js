import axios from 'axios';

const uploadFileApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

// foodGrou api
export const uploadApi = async (file) => {
    const res = await uploadFileApi.post('/api/upload', file);
    return res.data;
}